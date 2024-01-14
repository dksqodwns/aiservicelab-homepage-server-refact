import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Likes {
  @PrimaryGeneratedColumn()
  likeid: number;

  @Column()
  postid: number;

  @Column()
  liker: number;

  @CreateDateColumn()
  createdAt: Date;
}
