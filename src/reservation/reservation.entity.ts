import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { BookCopies } from '../book/book-copy.entity';  // Import BookCopy entity
import { Book } from 'src/book/book.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @ManyToOne(() => BookCopies, (bookCopies) => bookCopies.reservations) // Link to BookCopy
  bookCopy: BookCopies;

  @Column()
  reservedAt: Date;

  @Column()
  returnBy: Date;

   // You can use this getter to easily access the book title
   get book(): Book {
    return this.bookCopy?.book;
  }
}
