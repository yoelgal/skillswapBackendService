import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { Skill } from '../entities/skill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Skill])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
