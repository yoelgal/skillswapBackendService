import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../../utils/dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUser(@GetUser() user: User) {
    const userData = await this.usersService.findOne(user.id);
    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userData;
  }

  @Get('/all')
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @Post('/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
