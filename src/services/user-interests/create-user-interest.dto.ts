// src/services/user-interests/create-user-interest.dto.ts

import { IsInt, Min, Max } from 'class-validator';

export class CreateUserInterestDto {
  @IsInt()
  skillId: number;

  @IsInt()
  @Min(0)
  @Max(4)
  skillLevel: number;
}
