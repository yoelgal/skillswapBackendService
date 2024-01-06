// src/entities/user-interest.entity.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserInterestsService } from './user-interests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/user.entity';
import { GetUser } from '../../utils/get-user.decorator';
import { CreateUserInterestDto } from './create-user-interest.dto';

@Controller('user-interests')
export class UserInterestsController {
  constructor(private readonly userInterestsService: UserInterestsService) {}

  //Get method that calls the findAll() method from the UserInterestsService class.
  @Get('/get-all-user-interests')
  async getAllUserInterests() {
    return this.userInterestsService.findAll();
  }

  //get method that calls the findUserInterestsByUserId() method from the UserInterestsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/get-user-interests')
  async getUserInterestsByUserId(@GetUser() user: User) {
    return this.userInterestsService.findUserInterestsByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-user-interest')
  @HttpCode(HttpStatus.CREATED)
  async createUserInterest(
    @GetUser() user: User,
    @Body() createUserInterestDto: CreateUserInterestDto,
  ) {
    return this.userInterestsService.createUserInterest(
      user.id,
      createUserInterestDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-user-interest')
  async updateUserInterest(
    @GetUser() user: User,
    @Body('id') id: number,
    @Body('skillLevel') skillLevel: number,
  ) {
    return this.userInterestsService.updateUserInterest(
      user.id,
      id,
      skillLevel,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-user-interest')
  async deleteUserInterest(@GetUser() user: User, @Body('id') id: number) {
    return this.userInterestsService.deleteUserInterest(user.id, id);
  }
}
