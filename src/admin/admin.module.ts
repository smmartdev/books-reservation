import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ReservationModule } from '../reservation/reservation.module';
import { ReservationService } from 'src/reservation/reservation.service';
import { EmailService } from 'src/email/email.service';
import { BookService } from 'src/book/book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/reservation.entity';
import { Book } from 'src/book/book.entity';
import { User } from 'src/user/user.entity';
import { BookCopies } from 'src/book/book-copy.entity';

@Module({
  // imports: [ReservationModule],
  imports: [TypeOrmModule.forFeature([Reservation, Book, User, BookCopies]), ReservationModule],

  controllers: [AdminController],
  providers: [ReservationService, EmailService, BookService],

})
export class AdminModule { }
