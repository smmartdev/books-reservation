import { Injectable, NotFoundException, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './reservation.entity';
import { User } from '../user/user.entity';
import { BookCopies } from '../book/book-copy.entity'; // Import BookCopy entity
import { Book } from 'src/book/book.entity';
import { ReservationResponseDto } from './dto/reservation-response.dto'; // Adjust the path as needed

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(BookCopies)  // Inject BookCopy repository
    private readonly bookCopiesRepository: Repository<BookCopies>,

    @InjectRepository(Book)  // Inject BookCopy repository
    private readonly booksRepository: Repository<Book>,

    @InjectRepository(User)  // Inject User repository
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Reservation)  // Inject Reservation repository
    private readonly reservationsRepository: Repository<Reservation>,
  ) { }

  // Reserve a book for a user
  // async reserve(userId: number, bookId: number, durationInDays: number): Promise<any> {
  //   // Log to indicate that the reserve method has been called
  //   console.log("reserve called in reservation service");

  //   // Step 1: Fetch the user from the database using the provided userId
  //   const user = await this.usersRepository.findOne({ where: { id: userId } });

  //   // If the user is not found, throw a NotFoundException
  //   if (!user) throw new NotFoundException('User not found');

  //   // Step 2: Count the available copies for the given book
  //   const availableCopiesCount = await this.bookCopiesRepository.count({
  //     where: {
  //       book: { id: bookId },  // Filter by the bookId
  //       isReserved: false // Ensure the copy is not reserved
  //     }
  //   });

  //   // Step 3: If there are no available copies
  //   if (availableCopiesCount === 0) {
  //     // Throw an error indicating that no available copies are left
  //     throw new HttpException('No available copies left to reserve', HttpStatus.BAD_REQUEST);
  //   }

  //   // Step 4: Find an available copy of the book to reserve
  //   const availableCopy = await this.bookCopiesRepository.findOne({
  //     where: {
  //       book: { id: bookId },  // Filter by the bookId
  //       isReserved: false // Ensure the copy is not reserved
  //     }
  //   });

  //   // Step 5: If an available copy was found
  //   if (availableCopy) {
  //     // Mark the copy as reserved
  //     availableCopy.isReserved = true;

  //     // Save the updated book copy (setting isReserved to true)
  //     await this.bookCopiesRepository.save(availableCopy);

  //     // Step 6: Create a new reservation object
  //     const reservation = this.reservationsRepository.create({
  //       reservedAt: new Date(), // Set the current date and time as the reservation date
  //       returnBy: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000), // Set the return date based on the duration
  //       user: user, // Attach the user entity to the reservation
  //       bookCopy: availableCopy, // Attach the reserved book copy
  //     });

  //     // Step 7: Save the reservation to the database
  //     const savedReservation = await this.reservationsRepository.save(reservation);

  //     // Step 8: Map the reservation data to a ReservationResponseDto
  //     const reservationResponse = new ReservationResponseDto();
  //     reservationResponse.booked = true; // Indicate that the book has been successfully reserved

  //     // Fetch the book name from the book entity (using the fetched availableCopy's book relation)
  //     reservationResponse.bookName = availableCopy.book.title; // Book name is fetched from the book entity

  //     reservationResponse.returnDate = savedReservation.returnBy; // Return date from the reservation
  //     reservationResponse.userId = savedReservation.user.id; // The ID of the user who made the reservation
  //     reservationResponse.username = savedReservation.user.username; // The username of the user

  //     // Return the ReservationResponseDto object
  //     return reservationResponse;
  //   } else {
  //     // If no available copies are found (should not happen due to the earlier check)
  //     throw new HttpException('No available copies left to reserve', HttpStatus.BAD_REQUEST);
  //   }
  // }

  // Reserve a book for a user
  async reserve(userId: number, bookId: number, durationInDays: number): Promise<any> {
    // Log to indicate that the reserve method has been called
    console.log("reserve called in reservation service");

    // Step 1: Fetch the user from the database using the provided userId
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    // If the user is not found, throw a NotFoundException
    if (!user) throw new NotFoundException('User not found');

    // Step 2: Count the available copies for the given book
    const availableCopiesCount = await this.bookCopiesRepository.count({
      where: {
        book: { id: bookId },  // Filter by the bookId
        isReserved: false // Ensure the copy is not reserved
      }
    });

    // Step 3: If there are no available copies
    if (availableCopiesCount === 0) {
      // Throw an error indicating that no available copies are left
      throw new HttpException('No available copies left to reserve', HttpStatus.BAD_REQUEST);
    }

    // Step 4: Find an available copy of the book to reserve
    const availableCopy = await this.bookCopiesRepository.findOne({
      where: {
        book: { id: bookId },  // Filter by the bookId
        isReserved: false // Ensure the copy is not reserved
      },
      relations: ['book'], // Ensure we load the related book entity to access the title
    });

    // Step 5: If an available copy was found
    if (availableCopy) {
      // Mark the copy as reserved
      availableCopy.isReserved = true;

      // Save the updated book copy (setting isReserved to true)
      await this.bookCopiesRepository.save(availableCopy);

      // Step 6: Create a new reservation object
      const reservation = this.reservationsRepository.create({
        reservedAt: new Date(), // Set the current date and time as the reservation date
        returnBy: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000), // Set the return date based on the duration
        user: user, // Attach the user entity to the reservation
        bookCopy: availableCopy, // Attach the reserved book copy
      });

      // Step 7: Save the reservation to the database
      const savedReservation = await this.reservationsRepository.save(reservation);

      // Step 8: Map the reservation data to a ReservationResponseDto
      const reservationResponse = new ReservationResponseDto();
      reservationResponse.booked = true; // Indicate that the book has been successfully reserved

      // Fetch the book title from the related book entity (availableCopy.book.title)
      reservationResponse.bookName = availableCopy.book.title; // Get the book title using the relation

      reservationResponse.returnDate = savedReservation.returnBy; // Return date from the reservation
      reservationResponse.userId = savedReservation.user.id; // The ID of the user who made the reservation
      reservationResponse.username = savedReservation.user.username; // The username of the user

      // Return the ReservationResponseDto object
      return reservationResponse;
    } else {
      // If no available copies are found (should not happen due to the earlier check)
      throw new HttpException('No available copies left to reserve', HttpStatus.BAD_REQUEST);
    }
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
