import { Module } from '@nestjs/common';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from '../../entities/user-skill.entity';
import { Skill } from '../../entities/skill.entity';
import { UserInterest } from '../../entities/user-interest.entity';
import { User } from '../../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill, User, Skill, UserInterest])],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}
