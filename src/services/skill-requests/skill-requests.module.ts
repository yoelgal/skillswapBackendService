import { Module } from '@nestjs/common';
import { SkillRequestsController } from './skill-requests.controller';
import { SkillRequestsService } from './skill-requests.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkillRequest } from './skill-request.entity';
import { Skill } from '../skills/skill.entity';
import { User } from '../users/user.entity';
import { UserInterest } from '../user-interests/user-interest.entity';
import { Notification } from '../notifications/notification.entity';
import { UsersService } from '../users/users.service';
import { NotificationsService } from '../notifications/notifications.service';
import { HashService } from '../auth/hash.service';
import { MailService } from '../auth/mail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SkillRequest,
      User,
      Skill,
      UserInterest,
      Notification,
    ]),
  ],
  controllers: [SkillRequestsController],
  providers: [
    MailService,
    HashService,
    SkillRequestsService,
    UsersService,
    NotificationsService,
  ],
})
export class SkillRequestsModule {}
