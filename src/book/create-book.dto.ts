import { IsString, IsNotEmpty, IsDateString, IsInt } from 'class-validator';


export class CreateBookDto {
  
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDateString()
  @IsNotEmpty()
  publishedDate: string;  // Date string in "YYYY-MM-DD" format

  @IsInt()
  @IsNotEmpty()
  authorId: number;  // Au

  }



  
  
  