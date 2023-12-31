import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../../entities/notification.entity';
import { User } from '../../entities/user.entity';
import { Skill } from '../../entities/skill.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, User, Skill])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
