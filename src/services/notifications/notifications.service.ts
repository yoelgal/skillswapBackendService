import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationsRepository: Repository<Notification>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Notification[]> {
    return this.notificationsRepository.find();
  }

  //method to find all notifications by user id, if accepted is true, then it should return the sender's name, the skill name, and the sender's email. If not accepted, it should just return the sender's name and the skill name.
  async findNotificationsByUserId(userId: number): Promise<any[]> {
    const notifications = await this.notificationsRepository
      .createQueryBuilder('notification')
      .innerJoinAndSelect(User, 'sender', 'sender.id = notification.senderId')
      .innerJoinAndSelect(Skill, 'skill', 'skill.id = notification.skillId')
      .where('notification.receiverId = :userId', { userId })
      .select([
        'notification.id AS notification_id',
        'sender.name AS sender_name',
        'skill.name AS skill_name',
        'notification.accepted AS accepted',
        'sender.email AS sender_email', // Retrieve email but decide later whether to include it
      ])
      .getRawMany();

    // Modify each notification to conditionally include email
    return notifications.map((notification) => ({
      ...notification,
      sender_email: notification.accepted ? notification.sender_email : '',
    }));
  }
}
