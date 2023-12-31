import { Controller, Get, Param } from '@nestjs/common';
import { SkillsService } from './skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get('/all')
  async getAllSkills() {
    return this.skillsService.findAll();
  }

  @Get('/search/:input')
  async getSkillsBySearchInput(@Param('input') input: string) {
    return this.skillsService.findSkillsBySearchInput(input);
  }
}
