import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

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
