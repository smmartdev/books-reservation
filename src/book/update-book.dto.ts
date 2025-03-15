// update-book.dto.ts
import { IsString, IsOptional, IsDateString, IsInt } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string; // Optional, because it's only updated if provided
  
  @IsDateString()
  @IsOptional()
  publishedDate?: string; // Optional, because it's only updated if provided

  @IsInt()
  @IsOptional()
  authorId?: number; // Optional, but if provided, it should be the ID of the Author
}
