// src/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../entities/skill.entity';
import { Repository, DataSource, QueryRunner } from 'typeorm';
import { skillSeed } from './skill.seed';
import { User } from '../entities/user.entity';
import { userSeed } from './user.seed';
import { UserSkill } from '../entities/user-skill.entity';
import { userSkillSeed } from './user-skill.seed';
import { UserInterest } from '../entities/user-interest.entity';
import { userInterestSeed } from './user-interest.seed';
import { skillRequestSeed } from './skill-request-and-notification.seed';
import { notificationSeed } from './skill-request-and-notification.seed';
import { SkillRequest } from '../entities/skill-request.entity';
import { Notification } from '../entities/notification.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Skill)
    private readonly skillRepository: Repository<Skill>,
    @InjectRepository(UserSkill)
    private readonly userSkillRepository: Repository<UserSkill>,
    @InjectRepository(UserInterest)
    private readonly userInterestRepository: Repository<UserInterest>,
    @InjectRepository(SkillRequest)
    private readonly requestRepository: Repository<SkillRequest>,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly dataSource: DataSource,
  ) {}

  async seedDatabase() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.seedSkills(queryRunner);
      await this.seedUsers(queryRunner);
      await this.seedUserSkills(queryRunner);
      await this.seedUserInterests(queryRunner);
      await this.seedSkillRequests(queryRunner);
      await this.seedNotifications(queryRunner);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.error(err);
    } finally {
      await queryRunner.release();
    }
  }

  private async seedSkills(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Skill).delete({});
    await queryRunner.query('ALTER TABLE skill AUTO_INCREMENT = 1');
    await queryRunner.manager.getRepository(Skill).save(skillSeed);
  }

  private async seedUsers(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(User).delete({});
    await queryRunner.query('ALTER TABLE user AUTO_INCREMENT = 1');
    await queryRunner.manager.getRepository(User).save(userSeed);
  }

  private async seedUserSkills(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(UserSkill).delete({});
    await queryRunner.query('ALTER TABLE user_skill AUTO_INCREMENT = 1');
    await queryRunner.manager.getRepository(UserSkill).save(userSkillSeed);
  }

  private async seedUserInterests(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(UserInterest).delete({});
    await queryRunner.query('ALTER TABLE user_interest AUTO_INCREMENT = 1');
    await queryRunner.manager
      .getRepository(UserInterest)
      .save(userInterestSeed);
  }

  private async seedSkillRequests(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(SkillRequest).delete({});
    await queryRunner.query('ALTER TABLE skill_request AUTO_INCREMENT = 1');
    await queryRunner.manager
      .getRepository(SkillRequest)
      .save(skillRequestSeed);
  }

  private async seedNotifications(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Notification).delete({});
    await queryRunner.query('ALTER TABLE notification AUTO_INCREMENT = 1');
    await queryRunner.manager
      .getRepository(Notification)
      .save(notificationSeed);
  }
}
