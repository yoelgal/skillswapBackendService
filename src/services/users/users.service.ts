// src/services/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { HashService } from '../auth/hash.service';
import { MailService } from '../auth/mail.service';

@Injectable()
export class UsersService {
  constructor(
    private mailService: MailService,
    private hashService: HashService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let email;
    const tokenData = await this.mailService.decodeToken(
      createUserDto.emailToken,
    );
    if (tokenData.data) {
      email = tokenData.data.email;
    } else {
      throw new Error('Invalid email token');
    }

    const userExists = await this.usersRepository.findOne({ where: { email } });
    if (userExists) {
      throw new Error('Email already in use');
    }

    const name = email[0].toUpperCase() + email.slice(1).split('.')[0];

    const hashedPassword = await this.hashService.hashData(
      createUserDto.password,
    );

    const userEntity = {
      email,
      name,
      password: hashedPassword,
      age: createUserDto.age,
      gender: createUserDto.gender,
      yearOfStudy: createUserDto.yearOfStudy,
      course: createUserDto.course,
      reports: 0,
    };
    const user = this.usersRepository.create(userEntity);
    return this.usersRepository.save(user);
  }

  async reportUser(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    user.reports += 1;
    if (user.reports >= 4) {
      await this.mailService.notifyUserOfSuspension(user);
      return this.usersRepository.remove(user);
    } else {
      return this.usersRepository.save(user);
    }
  }

  async updateUser(
    userId: number,
    age: number,
    gender: number,
    yearOfStudy: number,
    course: string,
  ) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    user.age = age;
    user.gender = gender;
    user.yearOfStudy = yearOfStudy;
    user.course = course;

    return this.usersRepository.save(user);
  }
}
