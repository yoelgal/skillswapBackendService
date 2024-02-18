// src/services/user-skills/user-skill.entity.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillRequest } from './skill-request.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';
import { UserInterest } from '../user-interests/user-interest.entity';
import { Notification } from '../notifications/notification.entity';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SkillRequestsService {
  constructor(
    private usersService: UsersService,
    private notificationsService: NotificationsService,
    @InjectRepository(SkillRequest)
    private skillRequestRepository: Repository<SkillRequest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
    @InjectRepository(UserInterest)
    private userInterestsRepository: Repository<UserInterest>,
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
  ) {}

  async findAll(): Promise<SkillRequest[]> {
    return this.skillRequestRepository.find();
  }

  async findRequestsByUserId(userId: number): Promise<any[]> {
    return await this.skillRequestRepository
      .createQueryBuilder('request')
      .innerJoinAndSelect(User, 'sender', 'sender.id = request.senderId')
      .innerJoinAndSelect(Skill, 'skill', 'skill.id = request.skillId')
      .leftJoin(
        UserInterest,
        'userInterest',
        'userInterest.userId = sender.id AND userInterest.skillId = skill.id',
      )
      .where('request.userId = :userId', { userId })
      .select([
        'request.id AS request_id',
        'sender.name AS sender_name',
        'sender.id AS sender_id',
        'skill.name AS skill_name',
        'request.note',
        'userInterest.skillLevel AS skill_level',
      ])
      .getRawMany();
  }

  async createSkillRequest(
    skillId: number,
    userId: number,
    note: string,
    recipientId: number,
  ) {
    const skillRequest = new SkillRequest();
    skillRequest.skillId = skillId;
    skillRequest.userId = recipientId;
    skillRequest.note = note;
    skillRequest.senderId = userId;

    return await this.skillRequestRepository.save(skillRequest);
  }

  async deleteSkillRequest(requestId: number) {
    return await this.skillRequestRepository.delete(requestId);
  }

  async acceptSkillRequestAndCreateNotification(
    requestId: number,
    userId: number,
  ) {
    const request = await this.skillRequestRepository.findOne({
      where: { id: requestId },
    });

    if (request.userId !== userId) {
      throw new Error('You are not authorized to accept this request');
    }

    const senderId = request.userId;
    const receiverId = request.senderId;
    const skillId = request.skillId;
    const accepted = true;

    await this.notificationsService.createNotification(
      senderId,
      receiverId,
      skillId,
      accepted,
    );

    await this.skillRequestRepository.delete({ id: requestId });
  }

  async rejectSkillRequestAndCreateNotification(
    requestId: number,
    userId: number,
  ) {
    // this method should delete the request, and create an accepted notifcation

    const request = await this.skillRequestRepository.findOne({
      where: { id: requestId },
    });

    if (request.userId !== userId) {
      throw new Error('You are not authorized to reject this request');
    }

    const senderId = request.userId;
    const receiverId = request.senderId;
    const skillId = request.skillId;
    const accepted = false;

    await this.notificationsService.createNotification(
      senderId,
      receiverId,
      skillId,
      accepted,
    );

    await this.skillRequestRepository.delete({ id: requestId });
  }

  async reportSkillRequest(requestId: number, userId: number) {
    const request = await this.skillRequestRepository.findOne({
      where: { id: requestId },
    });

    if (request.userId !== userId) {
      throw new Error('You are not authorized to report this request');
    }

    const reportedUserId = request.senderId;
    await this.usersService.reportUser(reportedUserId);

    await this.rejectSkillRequestAndCreateNotification(requestId, userId);
  }
}
