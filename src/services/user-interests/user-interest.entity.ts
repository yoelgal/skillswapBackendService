// src/services/user-interests/user-interest.entity.ts

// Entity for UserInterest that has a primary generated id, a user id, a skill id, and a skill level(1-4)
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserInterest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  skillId: number;

  @Column()
  skillLevel: number;
}
