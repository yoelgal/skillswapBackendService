import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './services/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './services/users/user.entity';
import { SkillsModule } from './services/skills/skills.module';
import { SeedModule } from '../seed/seed.module';
import { Skill } from './services/skills/skill.entity';
import { UserSkill } from './services/user-skills/user-skill.entity';
import { UserSkillsModule } from './services/user-skills/user-skills.module';
import { UserInterestsModule } from './services/user-interests/user-interests.module';
import { UserInterest } from './services/user-interests/user-interest.entity';
import { SkillRequestsModule } from './services/skill-requests/skill-requests.module';
import { SkillRequest } from './services/skill-requests/skill-request.entity';
import { NotificationsModule } from './services/notifications/notifications.module';
import { Notification } from './services/notifications/notification.entity';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        User,
        Skill,
        UserSkill,
        UserInterest,
        SkillRequest,
        Notification,
      ],
      synchronize: true,
    }),
    UsersModule,
    SkillsModule,
    SeedModule,
    UserSkillsModule,
    UserInterestsModule,
    SkillRequestsModule,
    NotificationsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
