import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Post {
  @PrimaryGeneratedColumn()
  postid: number;

  @Column()
  contents: string;

  @Column()
  writer: number;

  @CreateDateColumn()
  createdAt: Date;
}
