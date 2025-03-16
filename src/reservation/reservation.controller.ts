import { Controller, Post, Get, Delete, Body, Param, Query } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto'; // Import DTO


@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) { }

  @Post()
  @ApiOperation({ summary: 'Reserve a book for a user' })
  @ApiResponse({ status: 201, description: 'Book reserved successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data provided' })
  @ApiBody({ type: CreateReservationDto }) // Specify the DTO for Swagger documentation
  async reserveBook(@Body() body: CreateReservationDto) {
    return this.reservationService.reserve(body.userId, body.bookId, body.durationInDays);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reservations for a user' })
  @ApiResponse({ status: 200, description: 'User reservations fetched successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserReservations(@Query('userId') userId: number) {
    return this.reservationService.findUserReservations(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel a reservation' })
  @ApiResponse({ status: 200, description: 'Reservation cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Reservation not found' })
  async cancelReservation(@Param('id') reservationId: number) {
    return this.reservationService.cancelReservation(reservationId);
  }
}
