import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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
