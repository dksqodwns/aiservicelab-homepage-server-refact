import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  noticeid: number;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column()
  writer: number;

  @Column()
  views: number; // TODO: default값을 0으로 만들어놓기

  @Column('text')
  img: string; // TEXT로 바꿔야 할듯

  @CreateDateColumn()
  createdAt: Date;
}
