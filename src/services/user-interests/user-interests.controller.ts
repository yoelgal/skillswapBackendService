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
import { CreateUserInterestDto } from '../../utils/dto/create-user-interest.dto';

@Controller('user-interests')
export class UserInterestsController {
  constructor(private readonly userInterestsService: UserInterestsService) {}

  //Get method that calls the findAll() method from the UserInterestsService class.
  @Get('/all')
  async getAllUserInterests() {
    return this.userInterestsService.findAll();
  }

  //get method that calls the findUserInterestsByUserId() method from the UserInterestsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUserInterestsByUserId(@GetUser() user: User) {
    return this.userInterestsService.findUserInterestsByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
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
  @Patch('/update')
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
  @Delete('/delete')
  async deleteUserInterest(@GetUser() user: User, @Body('id') id: number) {
    return this.userInterestsService.deleteUserInterest(user.id, id);
  }
}
