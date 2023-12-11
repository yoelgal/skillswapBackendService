// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository, DataSource } from 'typeorm';
import { skillSeed } from './skill.seed';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    private readonly dataSource: DataSource,
  ) {}

  async seedSkills(): Promise<void> {
    await this.skillRepository.delete({});

    await this.dataSource.query('ALTER TABLE skill AUTO_INCREMENT = 1');
    await this.skillRepository.save(skillSeed);
  }
}
