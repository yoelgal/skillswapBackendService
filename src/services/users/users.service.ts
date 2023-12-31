// src/services/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from '../../utils/dto/create-user.dto';
import { HashService } from '../auth/hash.service';

@Injectable()
export class UsersService {
  constructor(
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
    const email = createUserDto.email;
    const name = email[0].toUpperCase() + email.slice(1).split('.')[0];

    const hashedPassword = await this.hashService.hashData(
      createUserDto.password,
    );

    const userEntity = {
      ...createUserDto,
      password: hashedPassword,
      name,
      reports: 0,
    };
    const user = this.usersRepository.create(userEntity);
    return this.usersRepository.save(user);
  }
}
