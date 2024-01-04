import { IsInt, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  emailToken: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsInt()
  gender: number;

  @IsInt()
  @Min(1)
  yearOfStudy: number;

  @IsString()
  course: string;
}
