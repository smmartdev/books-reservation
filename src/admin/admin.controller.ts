import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
import { EmailService } from '../email/email.service';
import { BookService } from 'src/book/book.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly bookService: BookService,
    private readonly emailService: EmailService,
  ) {}

  @Get('reservations/date/:date')
  async getReservationsByDate(@Param('date') date: string) {
    return this.reservationService.findReservationsByDate(date);
  }

  @Get('reservations/overdue')
  async getOverdueReservations() {
    return this.reservationService.findOverdue();
  }

  @Get('books/category/:category')
  async getBooksByCategory(@Param('category') category: string) {
    return this.bookService.findBooksByCategory(category);
  }

  @Post('send-reminder/:reservationId')
  async sendOverdueReminder(@Param('reservationId') reservationId: number) {
    const reservation = await this.reservationService.findReservationsById(reservationId);
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    await this.emailService.sendOverdueNotification(reservation.user.email, reservation.book.title);
    return { message: 'Reminder email sent successfully' };
  }
}

