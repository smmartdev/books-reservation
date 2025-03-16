import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ summary: 'Sign up new user' })
  @ApiResponse({ status: 200, description: 'User created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: SignupDto }) // Enables Swagger to recognize the request structure
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login with email or username' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: LoginDto }) // Enables Swagger testing
  async login(@Body() body: LoginDto) {
    return this.authService.login(body.identifier, body.password);
  }
}






