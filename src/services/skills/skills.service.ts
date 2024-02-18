// src/services/skills/skills.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Brackets, Repository } from 'typeorm';
import { UserSkill } from '../user-skills/user-skill.entity';
import { UserInterest } from '../user-interests/user-interest.entity';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
    @InjectRepository(UserSkill)
    private userSkillsRepository: Repository<UserSkill>,
    @InjectRepository(UserInterest)
    private userInterestsRepository: Repository<UserInterest>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  async findSkillsBySearchInput(search: string): Promise<Skill[]> {
    return await this.skillsRepository
      .createQueryBuilder('skill')
      .where('skill.name LIKE :search', {
        search: `%${search}%`,
      })
      .orWhere('skill.tags LIKE :search', { search: `%${search}%` })
      .getMany();
  }

  async getAvailableSkills(userId: number) {
    // Get the IDs of the skills the user already has
    const userSkills = await this.userSkillsRepository.find({
      where: { userId },
      select: ['skillId'],
    });
    const userSkillIds = userSkills.map((us) => us.skillId);

    // Get the skills excluding the user's existing skills
    if (userSkillIds.length > 0) {
      return this.skillsRepository
        .createQueryBuilder('skill')
        .where('skill.id NOT IN (:...userSkillIds)', { userSkillIds })
        .getMany();
    } else {
      // If the user has no skills, return all skills
      return this.skillsRepository.find();
    }
  }

  async getAvailableSkillsFiltered(userId: number, search: string) {
    // Get the IDs of the skills the user already has
    const userSkills = await this.userSkillsRepository.find({
      where: { userId },
      select: ['skillId'],
    });
    const userSkillIds = userSkills.map((us) => us.skillId);

    // Base query builder for skills
    const queryBuilder = this.skillsRepository.createQueryBuilder('skill');

    // Filtering out user's existing skills
    if (userSkillIds.length > 0) {
      queryBuilder.where('skill.id NOT IN (:...userSkillIds)', {
        userSkillIds,
      });
    }

    // Adding search condition
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('skill.name LIKE :search', {
            search: `%${search}%`,
          }).orWhere('skill.tags LIKE :search', { search: `%${search}%` });
        }),
      );
    }

    // Execute the query
    return await queryBuilder.getMany();
  }

  async getAvailableInterests(userId: number) {
    // Get the IDs of the interests the user already has
    const userInterests = await this.userInterestsRepository.find({
      where: { userId },
      select: ['skillId'],
    });
    const userInterestIds = userInterests.map((ui) => ui.skillId);

    // Get the skills excluding the user's existing interests
    if (userInterestIds.length > 0) {
      return this.skillsRepository
        .createQueryBuilder('skill')
        .where('skill.id NOT IN (:...userInterestIds)', { userInterestIds })
        .getMany();
    } else {
      // If the user has no interests, return all skills
      return this.skillsRepository.find();
    }
  }

  async getAvailableInterestsFiltered(userId: number, search: string) {
    // Get the IDs of the interests the user already has
    const userInterests = await this.userInterestsRepository.find({
      where: { userId },
      select: ['skillId'],
    });
    const userInterestIds = userInterests.map((ui) => ui.skillId);

    // Base query builder for skills
    const queryBuilder = this.skillsRepository.createQueryBuilder('skill');

    // Filtering out user's existing interests
    if (userInterestIds.length > 0) {
      queryBuilder.where('skill.id NOT IN (:...userInterestIds)', {
        userInterestIds,
      });
    }

    // Adding search condition
    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('skill.name LIKE :search', {
            search: `%${search}%`,
          }).orWhere('skill.tags LIKE :search', { search: `%${search}%` });
        }),
      );
    }

    // Execute the query
    return await queryBuilder.getMany();
  }
}
