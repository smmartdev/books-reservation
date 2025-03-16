import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class SignupDto {
  @ApiProperty({ example: 'john_doe', description: 'Username of the new user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the new user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'StrongP@ssword123', description: 'Password (at least 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;
}
