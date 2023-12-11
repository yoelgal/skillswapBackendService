import { Module } from '@nestjs/common';
import { UserInterestsController } from './user-interests.controller';
import { UserInterestsService } from './user-interests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInterest } from '../entities/user-interest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserInterest])],
  controllers: [UserInterestsController],
  providers: [UserInterestsService],
})
export class UserInterestsModule {}
