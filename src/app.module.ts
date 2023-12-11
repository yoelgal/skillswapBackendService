import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { SkillsModule } from './skills/skills.module';
import { SeedModule } from './seed/seed.module';
import { Skill } from './entities/skill.entity';
import { UserSkillsModule } from './user-skills/user-skills.module';

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
      entities: [User, Skill],
      synchronize: true,
    }),
    UsersModule,
    SkillsModule,
    SeedModule,
    UserSkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
