import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { User } from '../users/user.entity';
import { Skill } from '../skills/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, Skill])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
