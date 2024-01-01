import { IsInt, IsString, Min, Max, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsInt()
  @Min(0)
  age: number;

  @IsInt()
  gender: number;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  startYear: number;

  @IsString()
  course: string;
}
