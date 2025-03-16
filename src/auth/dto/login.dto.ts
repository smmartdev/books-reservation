import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ 
    example: 'john_doe', 
    description: 'Username or Email of the user' 
  })
  @IsString()
  identifier: string; // Can be either email or username

  @ApiProperty({ 
    example: 'StrongP@ssword123', 
    description: 'User password (at least 6 characters)' 
  })
  @IsString()
  @MinLength(6)
  password: string;
}
