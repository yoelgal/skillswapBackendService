import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserSkill } from './user-skill.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserSkill, (userSkill) => userSkill.user)
  userSkills: UserSkill[];

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
