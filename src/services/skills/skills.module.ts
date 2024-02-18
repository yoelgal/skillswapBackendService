import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skill.entity';
import { UserSkill } from '../user-skills/user-skill.entity';
import { UserInterest } from '../user-interests/user-interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Skill, UserSkill, UserInterest])],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
