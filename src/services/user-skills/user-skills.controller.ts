import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserSkillsService } from './user-skills.service';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user-skills')
export class UserSkillsController {
  constructor(private readonly userSkillsService: UserSkillsService) {}

  //Get method that calls the findAll() method from the UserSkillsService class.
  @Get('/all')
  async getAllUserSkills() {
    return this.userSkillsService.findAll();
  }

  // Get method that calls the findUserSkillsByUserId() method from the UserSkillsService class, taking the id as a Param.
  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getUserSkillsByUserId(@GetUser() user: User) {
    return this.userSkillsService.findUserSkillsByUserId(user.id);
  }

  //Get method that calls the findSkillsThatMatchUserInterests() method from the UserSkillsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/dashboard')
  async getAdvancedSkills(@GetUser() user: User) {
    return this.userSkillsService.findSkillsThatMatchUserInterests(user.id);
  }

  //get method that calls the findUserSkillsBySearchInput() method from the UserSkillsService class.
  @UseGuards(JwtAuthGuard)
  @Get('/dashboard/:searchInput')
  async getSkillsBySearchInput(
    @GetUser() user: User,
    @Param('searchInput') searchInput: string,
  ) {
    return this.userSkillsService.findUserSkillsBySearchInput(
      user.id,
      searchInput,
    );
  }
}
