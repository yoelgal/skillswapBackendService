import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Skill } from './skill.entity';

@Entity()
export class UserInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userInterests)
  user: User;

  @ManyToOne(() => Skill)
  skill: Skill;

  @Column('int')
  skillLevel: number;
}
