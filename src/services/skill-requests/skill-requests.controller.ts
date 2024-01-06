// src/services/skill-requests/skill-requests.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SkillRequestsService } from './skill-requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('skill-requests')
export class SkillRequestsController {
  constructor(private readonly requestsService: SkillRequestsService) {}

  //Get method that calls the findAll() method from the SkillRequestsService class.
  @Get('/get-all-skill-requests')
  async getAllRequests() {
    return this.requestsService.findAll();
  }

  //Get method that takes the id as a Param and calls the findRequestsByUserId() method from the SkillRequestsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/get-user-skill-requests')
  async getRequestsByUserId(@GetUser() user: User) {
    return this.requestsService.findRequestsByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-skill-request')
  async createRequest(
    @GetUser() user: User,
    @Body('skillId') skillId: number,
    @Body('recipientId') recipientId: number,
    @Body('note') note: string,
  ) {
    return this.requestsService.createSkillRequest(
      skillId,
      user.id,
      note,
      recipientId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/accept-skill-request')
  async acceptRequest(
    @GetUser() user: User,
    @Body('requestId') requestId: number,
  ) {
    return this.requestsService.acceptSkillRequestAndCreateNotification(
      requestId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/reject-skill-request')
  async rejectRequest(
    @GetUser() user: User,
    @Body('requestId') requestId: number,
  ) {
    return this.requestsService.rejectSkillRequestAndCreateNotification(
      requestId,
      user.id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/report-skill-request')
  async reportRequest(
    @GetUser() user: User,
    @Body('requestId') requestId: number,
  ) {
    return this.requestsService.reportSkillRequest(requestId, user.id);
  }
}
