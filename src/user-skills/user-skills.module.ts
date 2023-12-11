import { Module } from '@nestjs/common';
import { UserSkillsController } from './user-skills.controller';
import { UserSkillsService } from './user-skills.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSkill } from '../entities/user-skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSkill])],
  controllers: [UserSkillsController],
  providers: [UserSkillsService],
})
export class UserSkillsModule {}
