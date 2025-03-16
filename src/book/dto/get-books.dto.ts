import { IsOptional, IsEnum, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../CategoryEnum';  // Import the enum

export class GetBooksDto {
  @ApiPropertyOptional({ enum: Category, description: 'Filter books by category' })
  @IsOptional()  // Optional
  @IsEnum(Category)  // Ensure the category is one of the enum values
  category?: Category;

  @ApiPropertyOptional({ description: 'Search books by title or author' })
  @IsOptional()  // Optional
  @IsString()
  search?: string;
}
