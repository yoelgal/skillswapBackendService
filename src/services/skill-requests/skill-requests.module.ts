import { Module } from '@nestjs/common';
import { SkillRequestsController } from './skill-requests.controller';
import { SkillRequestsService } from './skill-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRequest } from '../../entities/skill-request.entity';
import { Skill } from '../../entities/skill.entity';
import { User } from '../../entities/user.entity';
import { UserInterest } from '../../entities/user-interest.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkillRequest, User, Skill, UserInterest]),
  ],
  controllers: [SkillRequestsController],
  providers: [SkillRequestsService],
})
export class SkillRequestsModule {}
