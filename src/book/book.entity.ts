import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookCopies } from './book-copy.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  category: string;

  @OneToMany(() => BookCopies, (copy) => copy.book)
  copies: BookCopies[];
}
