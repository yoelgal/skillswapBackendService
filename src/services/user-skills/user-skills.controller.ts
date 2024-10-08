// src/services/user-skills/user-skills.service.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserSkillDto } from './create-user-skill.dto';

@Controller('user-skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  //Get method that calls the findAll() method from the UserSkillsService class.
  @Get('/get-all-user-skills')
  async getAllUserSkills() {
    return this.userSkillsService.findAll();
  }

  // Get method that calls the findUserSkillsByUserId() method from the UserSkillsService class, taking the id as a Param.
  @UseGuards(JwtAuthGuard)
  @Get('/get-user-skills')
  async getUserSkillsByUserId(@GetUser() user: User) {
    return this.userSkillsService.findUserSkillsByUserId(user.id);
  }

  //Get method that calls the findSkillsThatMatchUserInterests() method from the UserSkillsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/get-matches')
  async getAdvancedSkills(@GetUser() user: User) {
    return this.userSkillsService.findSkillsThatMatchUserInterests(user.id);
  }

  //get method that calls the findUserSkillsBySearchInput() method from the UserSkillsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/search/:searchInput')
  async getSkillsBySearchInput(
    @GetUser() user: User,
    @Param('searchInput') searchInput: string,
  ) {
    return this.userSkillsService.findUserSkillsBySearchInput(
      user.id,
      searchInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-user-skill')
  @HttpCode(HttpStatus.CREATED)
  async createUserSkill(
    @GetUser() user: User,
    @Body() createUserSkillDto: CreateUserSkillDto,
  ) {
    return this.userSkillsService.createUserSkill(user.id, createUserSkillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-user-skill')
  async updateUserSkill(
    @GetUser() user: User,
    @Body('id') id: number,
    @Body('note') note: string,
    @Body('skillLevel') skillLevel: number,
  ) {
    return this.userSkillsService.updateUserSkill(
      user.id,
      id,
      note,
      skillLevel,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-user-skill')
  async deleteUserSkill(@GetUser() user: User, @Body('id') id: number) {
    return this.userSkillsService.deleteUserSkill(user.id, id);
  }
}
