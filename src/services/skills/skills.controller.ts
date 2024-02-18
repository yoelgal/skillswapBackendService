// src/services/user-skills/user-skill.entity.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('/get-all-skills')
  async getAllSkills() {
    return this.skillsService.findAll();
  }

  @Get('/search/:input')
  async getSkillsBySearchInput(@Param('input') input: string) {
    return this.skillsService.findSkillsBySearchInput(input);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-available-skills')
  async getAvailableSkills(@GetUser() user: User) {
    return this.skillsService.getAvailableSkills(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-available-skills/:search')
  async getAvailableSkillsBySearch(
    @GetUser() user: User,
    @Param('search') search: string,
  ) {
    return this.skillsService.getAvailableSkillsFiltered(user.id, search);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-available-interests')
  async getAvailableInterests(@GetUser() user: User) {
    return this.skillsService.getAvailableInterests(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-available-interests/:search')
  async getAvailableInterestsBySearch(
    @GetUser() user: User,
    @Param('search') search: string,
  ) {
    return this.skillsService.getAvailableInterestsFiltered(user.id, search);
  }
}
