import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Plan {
  @PrimaryGeneratedColumn()
  planid: number;

  @Column()
  writer: number;

  @Column('text')
  contents: string;

  @CreateDateColumn()
  createdAt: Date;
}
