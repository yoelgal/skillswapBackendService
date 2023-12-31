import { Module } from '@nestjs/common';
import { SkillRequestsController } from './skill-requests.controller';
import { SkillRequestsService } from './skill-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRequest } from './skill-request.entity';
import { Skill } from '../skills/skill.entity';
import { User } from '../users/user.entity';
import { UserInterest } from '../user-interests/user-interest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillRequest, User, Skill, UserInterest]),
  ],
  controllers: [SkillRequestsController],
  providers: [SkillRequestsService],
})
export class SkillRequestsModule {}
