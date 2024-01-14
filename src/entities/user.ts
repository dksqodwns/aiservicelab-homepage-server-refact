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
  question: number;

  @Column()
  answer: string;

  @Column({ default: 1 })
  master: number;

  @Column({ nullable: true })
  token: string;
}
