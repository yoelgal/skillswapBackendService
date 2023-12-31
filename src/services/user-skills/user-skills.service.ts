import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkill } from './user-skill.entity';
import { Repository } from 'typeorm';
import { UserInterest } from '../user-interests/user-interest.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';
import { CreateUserSkillDto } from '../../utils/dto/create-user-skill.dto';

@Injectable()
export class UserSkillsService {
  constructor(
    @InjectRepository(UserSkill)
    private userSkillsRepository: Repository<UserSkill>,
    @InjectRepository(UserInterest)
    private userInterestsRepository: Repository<UserInterest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Skill)
    private skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<UserSkill[]> {
    return this.userSkillsRepository.find();
  }

  async findUserSkillsByUserId(userId: number): Promise<any[]> {
    return await this.userSkillsRepository
      .createQueryBuilder('userSkill')
      .innerJoin('user', 'user', 'user.id = userSkill.userId')
      .innerJoin('skill', 'skill', 'skill.id = userSkill.skillId')
      .where('userSkill.userId = :userId', { userId })
      .select([
        'userSkill.id AS id',
        'skill.name AS skill_name',
        'userSkill.skillLevel as skill_level',
        'userSkill.note as note',
      ])
      .getRawMany();
  }

  async findSkillsThatMatchUserInterests(userId: number): Promise<any[]> {
    return await this.userSkillsRepository
      .createQueryBuilder('userSkill')
      .innerJoin('user', 'user', 'user.id = userSkill.userId')
      .innerJoin('skill', 'skill', 'skill.id = userSkill.skillId')
      .innerJoinAndSelect(
        UserInterest,
        'interest',
        'interest.skillId = userSkill.skillId AND interest.userId = :userId',
        { userId },
      )
      .where('userSkill.userId != :userId', { userId })
      .andWhere('userSkill.skillLevel > interest.skillLevel')
      .select([
        'userSkill.id as id',
        'user.name AS user_name',
        'skill.name AS skill_name',
        'userSkill.userId as user_id',
        'userSkill.skillLevel as skill_level',
        'userSkill.note as note',
      ])
      .getRawMany();
  }

  //method that takes a user id and a search input and returns all user skills that exclude the user id and are like the search input
  async findUserSkillsBySearchInput(
    userId: number,
    searchInput: string,
  ): Promise<any[]> {
    return await this.userSkillsRepository
      .createQueryBuilder('userSkill')
      .innerJoin('user', 'user', 'user.id = userSkill.userId')
      .innerJoin('skill', 'skill', 'skill.id = userSkill.skillId')
      .where('userSkill.userId != :userId', { userId })
      .andWhere('skill.name LIKE :searchInput', {
        searchInput: `%${searchInput}%`,
      })
      .select([
        'userSkill.id as id',
        'user.name AS user_name',
        'skill.name AS skill_name',
        'userSkill.userId as user_id',
        'userSkill.skillLevel as skill_level',
        'userSkill.note as note',
      ])
      .getRawMany();
  }
}
