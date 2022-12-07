/* eslint-disable @typescript-eslint/no-unused-vars */

import { Book } from 'src/book/entities/book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  password: string;

  @OneToMany((type) => Book, (sasi) => sasi.user)
  @JoinColumn()
  notes: Book[];
}
