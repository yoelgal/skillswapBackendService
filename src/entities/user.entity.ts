import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSkill } from './user-skill.entity';
import { UserInterest } from './user-interest.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];

  @OneToMany(() => UserSkill, (userInterest) => userInterest.user)
  userInterests: UserInterest[];

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
  startYear: number;

  @Column()
  course: string;

  @Column()
  reports: number;
}
