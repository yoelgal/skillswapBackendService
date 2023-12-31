// entity for request that has a generated id, a user id, a sender id, a skill id, and a note
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SkillRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  senderId: number;

  @Column()
  skillId: number;

  @Column()
  note: string;
}
