import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Skill } from '../src/services/skills/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/services/users/user.entity';
import { UserSkill } from '../src/services/user-skills/user-skill.entity';
import { UserInterest } from '../src/services/user-interests/user-interest.entity';
import { SkillRequest } from '../src/services/skill-requests/skill-request.entity';
import { Notification } from '../src/services/notifications/notification.entity';
import { HashService } from '../src/services/auth/hash.service';

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
  providers: [SeedService, HashService],
  exports: [SeedService],
})
export class SeedModule {}
