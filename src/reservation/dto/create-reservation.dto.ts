import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ description: 'The ID of the book being reserved', example: 1 })
  @IsInt()
  @IsPositive()
  bookId: number;

  @ApiProperty({ description: 'The ID of the user making the reservation', example: 10})
  @IsInt()
  @IsPositive()
  userId: number;

  @ApiProperty({ description: 'Duration of the reservation in days', example: 7 })
  @IsInt()
  @IsPositive()
  durationInDays: number;
}
