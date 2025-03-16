import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookCopies } from './book-copy.entity';
import { Category } from './CategoryEnum';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  availableCopies: number;
  
  @Column({
    type: 'enum',
    enum: Category,
  })
  category: Category;

  @OneToMany(() => BookCopies, (copy) => copy.book)
  copies: BookCopies[];
}
