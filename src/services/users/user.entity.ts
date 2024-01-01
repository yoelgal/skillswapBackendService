//src/services/user-skills/user-skills.service.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  age: number;

  @Column()
  gender: number;

  @Column()
  yearOfStudy: number;

  @Column()
  course: string;

  @Column()
  reports: number;
}
