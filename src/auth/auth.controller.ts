import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() body: { username: string; email: string; password: string }) {
    return this.authService.signup(body.username, body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log("login called in auth controller")
    return this.authService.login(body.username, body.password);
  }
}
