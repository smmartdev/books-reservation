import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';  // Import Book entity
import { Reservation } from '../reservation/reservation.entity';  // Import Reservation entity

@Entity()
export class BookCopies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  copyNumber: number;

  @Column({ default: false })
  isReserved: boolean;

  @ManyToOne(() => Book, (book) => book.copies)
  book: Book;

  @OneToMany(() => Reservation, (reservation) => reservation.bookCopy)
  reservations: Reservation[];
}




