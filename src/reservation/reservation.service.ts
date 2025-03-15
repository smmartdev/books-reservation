import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from '../user/user.entity';
import { BookCopies } from '../book/book-copy.entity'; // Import BookCopy entity

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(BookCopies)  // Inject BookCopy repository
    private readonly bookCopiesRepository: Repository<BookCopies>,

    @InjectRepository(User)  // Inject User repository
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Reservation)  // Inject Reservation repository
    private readonly reservationsRepository: Repository<Reservation>,
  ) { }

  // Method to create a new reservation
  async reserve(userId: number, bookCopyId: number, durationInDays: number): Promise<Reservation> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    const bookCopy = await this.bookCopiesRepository.findOne({ where: { id: bookCopyId } });

    if (!user) throw new NotFoundException('User not found');
    if (!bookCopy) throw new NotFoundException('Book copy not found');

    const reservation = this.reservationsRepository.create({
      user,
      bookCopy, // Reserve specific book copy
      reservedAt: new Date(),
      returnBy: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000),
    });

    return this.reservationsRepository.save(reservation);
  }

  // Method to find all reservations for a user
  async findUserReservations(userId: number): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { user: { id: userId } },
      relations: ['bookCopy', 'bookCopy.book'], // Include related book copy and book
    });
  }

  // Method to find all overdue reservations
  async findOverdue(): Promise<Reservation[]> {
    return this.reservationsRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.bookCopy', 'bookCopy')
      .leftJoinAndSelect('bookCopy.book', 'book')
      .leftJoinAndSelect('reservation.user', 'user')
      .where('reservation.returnBy < NOW()')
      .getMany();
  }

  // Method to find reservations by date
  async findReservationsByDate(date: string): Promise<Reservation[]> {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return this.reservationsRepository.find({
      where: {
        reservedAt: parsedDate,
      },
      relations: ['bookCopy', 'user'],
    });
  }

  // Method to find reservation by ID
  async findReservationsById(reservationId: number): Promise<Reservation | null> {
    return this.reservationsRepository.findOne({
      where: { id: reservationId },
      relations: ['bookCopy', 'bookCopy.book', 'user'],
    });
  }

  // Method to cancel a reservation
  async cancelReservation(reservationId: number): Promise<{ message: string }> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id: reservationId },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    await this.reservationsRepository.remove(reservation);

    return { message: 'Reservation cancelled successfully' };
  }
}
