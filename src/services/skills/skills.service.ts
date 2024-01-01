// src/services/skills/skills.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillsRepository: Repository<Skill>,
  ) {}

  async findAll(): Promise<Skill[]> {
    return this.skillsRepository.find();
  }

  async findSkillsBySearchInput(search: string): Promise<Skill[]> {
    return await this.skillsRepository
      .createQueryBuilder('skill')
      .where('skill.name LIKE :search', { search: `%${search}%` })
      .getMany();
  }
}
