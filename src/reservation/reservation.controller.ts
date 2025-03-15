import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  async reserveBook(@Body() body: { bookId: number; userId: number; durationInDays: number }) {
    return this.reservationService.reserve(body.userId, body.bookId, body.durationInDays);
  }

  @Get()
  async getUserReservations(@Query('userId') userId: number) {
    return this.reservationService.findUserReservations(userId);
  }

  @Delete(':id')
  async cancelReservation(@Param('id') reservationId: number) {
    return this.reservationService.cancelReservation(reservationId);
  }
}
