import { ApiProperty } from '@nestjs/swagger';

export class ReservationResponseDto {
  @ApiProperty({ description: 'Whether the book has been reserved', example: true })
  booked: boolean;

  @ApiProperty({ description: 'The name of the reserved book', example: 'The Great Gatsby' })
  bookName: string;

  @ApiProperty({ description: 'The date when the book should be returned', example: '2025-03-23T09:15:11.715Z' })
  returnDate: Date;

  @ApiProperty({ description: 'ID of the user who made the reservation', example: 10 })
  userId: number;

  @ApiProperty({ description: 'Username of the user who made the reservation', example: 'Dia' })
  username: string;
}
