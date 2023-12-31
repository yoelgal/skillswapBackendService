import { IsInt, IsString, Min, Max } from 'class-validator';

export class CreateUserSkillDto {
  @IsInt()
  skillId: number;

  @IsString()
  note: string;

  @IsInt()
  @Min(0)
  @Max(4)
  skillLevel: number;
}
