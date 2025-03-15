import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from './reservation.entity';
import { Book } from '../book/book.entity';
import { User } from '../user/user.entity';
import { BookCopies } from 'src/book/book-copy.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Book, User,BookCopies])],
  
  providers: [ReservationService],
  controllers: [ReservationController],
  exports: [ReservationService],  // Export ReservationService

})
export class ReservationModule {}
