import { IsInt, Min } from 'class-validator';

export class UserIdParams {
  @IsInt()
  @Min(1)
  id: number;
}
