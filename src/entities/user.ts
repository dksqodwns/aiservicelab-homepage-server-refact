import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userid: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  pwd: string;

  @Column()
  question: string;

  @Column()
  answer: string;

  @Column()
  master: number;

  @Column()
  token: string;
}
