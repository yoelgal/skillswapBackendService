import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserInterestsService } from './user-interests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../../entities/user.entity';
import { GetUser } from '../../utils/get-user.decorator';

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
}
