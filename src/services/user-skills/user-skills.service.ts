// src/services/user-skills/user-skills.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSkill } from './user-skill.entity';
import { Repository } from 'typeorm';
import { UserInterest } from '../user-interests/user-interest.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';
import { CreateUserSkillDto } from './create-user-skill.dto';

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

  async findAll(): Promise<any[]> {
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
        'skill.html AS skill_html',
        'skill.id AS skill_id',
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
        'user.age AS user_age',
        'user.gender AS user_gender',
        'user.course AS user_course',
        'skill.name AS skill_name',
        'skill.html AS skill_html',
        'skill.id AS skill_id',
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
      .orWhere('skill.tags LIKE :search', { search: `%${searchInput}%` })
      .orWhere('userSkill.note LIKE :search', { search: `%${searchInput}%` })
      .select([
        'userSkill.id as id',
        'user.name AS user_name',
        'user.age AS user_age',
        'user.gender AS user_gender',
        'user.course AS user_course',
        'skill.name AS skill_name',
        'skill.html AS skill_html',
        'skill.id AS skill_id',
        'userSkill.userId as user_id',
        'userSkill.skillLevel as skill_level',
        'userSkill.note as note',
      ])
      .getRawMany();
  }

  async updateUserSkill(
    userId: number,
    id: number,
    note: string,
    skillLevel: number,
  ): Promise<any> {
    const userSkill = await this.userSkillsRepository.findOne({
      where: { id },
    });

    if (userSkill.userId != userId) {
      throw new Error('User does not own this skill.');
    }
    userSkill.note = note;
    userSkill.skillLevel = skillLevel;
    return await this.userSkillsRepository.save(userSkill);
  }

  async createUserSkill(
    userId: number,
    createUserSkillDto: CreateUserSkillDto,
  ) {
    const { skillId, note, skillLevel } = createUserSkillDto;

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const skill = await this.skillsRepository.findOne({
      where: { id: skillId },
    });

    const userSkill = new UserSkill();
    userSkill.userId = user.id;
    userSkill.skillId = skill.id;
    userSkill.note = note;
    userSkill.skillLevel = skillLevel;

    return await this.userSkillsRepository.save(userSkill);
  }

  async deleteUserSkill(userId: number, id: number): Promise<any> {
    const userSkill = await this.userSkillsRepository.findOne({
      where: { id },
    });

    if (userSkill.userId != userId) {
      throw new Error('User does not own this skill.');
    }

    return await this.userSkillsRepository.delete({ id });
  }
}
