import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Path: src/entities/user-skill.entity.ts
// Entity for UserSkill that has a primary generated id, a userid, a skill id, a note, and a skill level(1-4)
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
