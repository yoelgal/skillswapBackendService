// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skills/entities/skill.entity';
import { Repository } from 'typeorm';
import { skillSeed } from './skill.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
  ) {}

  async seedSkills(): Promise<void> {
    const skills = await this.skillRepository.find();
    if (skills.length === 0) {
      await this.skillRepository.save(skillSeed);
    }
  }
}
