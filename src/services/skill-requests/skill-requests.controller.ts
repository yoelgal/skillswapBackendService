import { Controller, Get, UseGuards } from '@nestjs/common';
import { SkillRequestsService } from './skill-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('skill-requests')
export class SkillRequestsController {
  constructor(private readonly requestsService: SkillRequestsService) {}

  //Get method that calls the findAll() method from the SkillRequestsService class.
  @Get('/all')
  async getAllRequests() {
    return this.requestsService.findAll();
  }

  //Get method that takes the id as a Param and calls the findRequestsByUserId() method from the SkillRequestsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getRequestsByUserId(@GetUser() user: User) {
    return this.requestsService.findRequestsByUserId(user.id);
  }
}
