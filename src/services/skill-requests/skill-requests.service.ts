import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SkillRequest } from '../../entities/skill-request.entity';
import { User } from '../../entities/user.entity';
import { Skill } from '../../entities/skill.entity';
import { UserInterest } from '../../entities/user-interest.entity';

@Injectable()
export class SkillRequestsService {
  constructor(
    @InjectRepository(SkillRequest)
    private requestsRepository: Repository<SkillRequest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
    @InjectRepository(UserInterest)
    private userInterestsRepository: Repository<UserInterest>,
  ) {}

  async findAll(): Promise<SkillRequest[]> {
    return this.requestsRepository.find();
  }

  async findRequestsByUserId(userId: number): Promise<any[]> {
    return await this.requestsRepository
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
        'skill.name AS skill_name',
        'request.note',
        'userInterest.skillLevel AS skill_level',
      ])
      .getRawMany();
  }
}
