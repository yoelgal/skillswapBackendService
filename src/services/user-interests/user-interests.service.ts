import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInterest } from './user-interest.entity';
import { Repository } from 'typeorm';
import { Skill } from '../skills/skill.entity';
import { CreateUserInterestDto } from '../../utils/dto/create-user-interest.dto';

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

  async createUserInterest(
    userId: number,
    createUserInterestDto: CreateUserInterestDto,
  ): Promise<UserInterest> {
    const { skillId, skillLevel } = createUserInterestDto;
    const userInterest = new UserInterest();
    userInterest.userId = userId;
    userInterest.skillId = skillId;
    userInterest.skillLevel = skillLevel;
    return this.userInterestsRepository.save(userInterest);
  }

  // compare this snippet with the one from src/services/user-skills/user-skills.service.ts
  async updateUserInterest(userId: number, id: number, skillLevel: number) {
    const userInterest = await this.userInterestsRepository.findOne({
      where: { userId, id },
    });

    if (userInterest.userId !== userId) {
      throw new Error('User does not own this interest');
    }

    userInterest.skillLevel = skillLevel;
    return this.userInterestsRepository.save(userInterest);
  }

  async deleteUserInterest(userId: number, id: number) {
    const userInterest = await this.userInterestsRepository.findOne({
      where: { id },
    });

    if (userInterest.userId !== userId) {
      throw new Error('User does not own this interest');
    }

    return this.userInterestsRepository.delete({ id });
  }
}
