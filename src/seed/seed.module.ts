import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Skill } from '../entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UserSkill } from '../entities/user-skill.entity';
import { UserInterest } from '../entities/user-interest.entity';
import { SkillRequest } from '../entities/skill-request.entity';
import { Notification } from '../entities/notification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Skill,
      User,
      UserSkill,
      UserInterest,
      SkillRequest,
      Notification,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
