import { Controller, Get, Post, Param, NotFoundException } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';
import { EmailService } from '../email/email.service';
import { BookService } from 'src/book/book.service';
import { Category } from 'src/book/CategoryEnum';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly bookService: BookService,
    private readonly emailService: EmailService,
  ) { }

  @Get('reservations/date/:date')
  @ApiOperation({ summary: 'Get all reservations in specific date' })
  @ApiResponse({ status: 200, description: 'List of reservations retrieved successfully.' })
  async getReservationsByDate(@Param('date') date: string) {
    return this.reservationService.findReservationsByDate(date);
  }

  @Get('reservations/overdue')
  async getOverdueReservations() {
    return this.reservationService.findOverdue();
  }

  @Get('books/category/:category')
  async getBooksByCategory(@Param('category') category: Category) {
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

