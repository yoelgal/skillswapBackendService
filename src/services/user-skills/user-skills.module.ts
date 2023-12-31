import { Module } from '@nestjs/common';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from './user-skill.entity';
import { Skill } from '../skills/skill.entity';
import { UserInterest } from '../user-interests/user-interest.entity';
import { User } from '../users/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill, User, Skill, UserInterest])],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}
