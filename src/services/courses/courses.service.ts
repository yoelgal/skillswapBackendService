// src/services/courses/courses.service.ts

import { Injectable } from '@nestjs/common';
import { courses } from '../../utils/courses.data';

@Injectable()
export class CoursesService {
  async findAll(): Promise<string[]> {
    return courses;
  }

  async findBySearch(search: string): Promise<string[]> {
    return courses.filter((course) =>
      course.toLowerCase().includes(search.toLowerCase()),
    );
  }
}
