import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Project {
  @PrimaryGeneratedColumn()
  projectid: number;

  @Column()
  title: string;

  @Column('text')
  contents: string;

  @Column()
  link: string;

  @Column()
  writer: number;

  @Column()
  img: string;

  @CreateDateColumn()
  createdAt: Date;
}
