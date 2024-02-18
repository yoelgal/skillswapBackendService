//src/services/user-skills/user-skills.service.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Min } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Min(0)
  @Column()
  age: number;

  @Column()
  gender: number;

  @Min(0)
  @Column()
  yearOfStudy: number;

  @Column()
  course: string;

  @Column()
  reports: number;
}
