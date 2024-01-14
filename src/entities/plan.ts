import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
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
