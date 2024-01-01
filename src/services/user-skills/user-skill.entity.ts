// src/services/user-skills/user-skill.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserSkill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  skillId: number;

  @Column()
  note: string;

  @Column()
  skillLevel: number;
}
