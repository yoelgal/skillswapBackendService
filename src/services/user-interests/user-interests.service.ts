import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterest } from './user-interest.entity';
import { Repository } from 'typeorm';
import { Skill } from '../skills/skill.entity';

@Injectable()
export class UserInterestsService {
  constructor(
    @InjectRepository(UserInterest)
    private userInterestsRepository: Repository<UserInterest>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<UserInterest[]> {
    return this.userInterestsRepository.find();
  }

  //method that takes a user id and returns all user interests that match the user id
  async findUserInterestsByUserId(userId: number): Promise<any[]> {
    return await this.userInterestsRepository
      .createQueryBuilder('userInterest')
      .innerJoin('skill', 'skill', 'skill.id = userInterest.skillId')
      .where('userInterest.userId = :userId', { userId })
      .select([
        'userInterest.id AS id',
        'skill.name AS skill_name',
        'userInterest.skillLevel AS skill_level',
      ])
      .getRawMany();
  }
}
