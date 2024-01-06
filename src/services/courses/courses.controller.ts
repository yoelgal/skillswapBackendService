// src/services/courses/courses.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/get-all-courses')
  async getAllCourses() {
    return this.coursesService.findAll();
  }

  @Get('/search/:search')
  async getCoursesBySearch(@Param('search') search: string) {
    return this.coursesService.findBySearch(search);
  }
}
