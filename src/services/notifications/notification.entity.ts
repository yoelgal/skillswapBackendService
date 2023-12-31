//entity for notification that has a primary key, a senderId, a receiverId, a skillId, and an accepted boolean flag
// Path: src/entities/notification.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  senderId: number;

  @Column()
  receiverId: number;

  @Column()
  skillId: number;

  @Column()
  accepted: boolean;
}
