import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  // async signup(username: string, email: string, password: string) {
  //   // Check if the user already exists
  //   const existingUser = await this.userService.findByUsername(username);
  //   if (existingUser) {
  //     throw new BadRequestException('Username already taken');
  //   }

  //   const existingEmail = await this.userService.findUserByEmail(email);
  //   if (existingEmail) {
  //     throw new BadRequestException('Email already in use');
  //   }

  //   // Hash the password before saving
  //   const hashedPassword = await bcrypt.hash(password,10);

  //   // Create and save the new user
  //   const user = await this.userService.create(username, email, hashedPassword);

  //   // Generate JWT token for the new user
  //   const payload = { userId: user.id, username: user.username };
  //   const accessToken = this.jwtService.sign(payload);

  //   return {
  //     message: 'User registered successfully',
  //     access_token: accessToken,
  //   };
  // }

  async signup(username: string, email: string, password: string) {
    // Check if the user already exists
    console.log({password});
    
    const existingUser = await this.userService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already taken');
    }
  
    const existingEmail = await this.userService.findUserByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }
  
    // Hash the password before saving (Ensure consistent salt rounds)
    const SALT_ROUNDS = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  
    console.log("Hashed Password Before Saving:", hashedPassword);
  
    // Create and save the new user
    const user = await this.userService.create(username, email, hashedPassword);
  
    console.log("Stored Hashed Password in DB:", user.password);
  
    // Generate JWT token for the new user
    const payload = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload);
  
    return {
      message: 'User registered successfully',
      access_token: accessToken,
    };
  }
  

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async login(username: string, password: string) {
  //   console.log("login called in auth service")

  //   const user = await this.userService.findByUsername(username);
  //   console.log({ user })

  //   if (!user || !(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException('Invalid credentials');
  //   }

  //   const payload = { userId: user.id, username: user.username };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async login(identifier: string, password: string) {
    console.log("Login called in auth service");
    

    
    const user = await this.userService.findByUsernameOrPassword(identifier);
    console.log("User found:", user);

    if (!user) {
      throw new UnauthorizedException("Invalid credentials (User not found)");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials (Wrong password)");
    }

    const payload = { userId: user.id, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
