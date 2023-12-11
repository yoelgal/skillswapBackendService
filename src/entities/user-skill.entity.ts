import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Skill } from './skill.entity';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userSkills)
  user: User;

  @ManyToOne(() => Skill)
  skill: Skill;

  @Column()
  note: string;

  @Column('int')
  skillLevel: number;
}
