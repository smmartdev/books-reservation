import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  async create(username: string, email: string, password: string): Promise<User> {
    const user = this.usersRepository.create({ username, email, password });
    return this.usersRepository.save(user);
  }


  async findByUsernameOrPassword(identifier: string): Promise<User | null> {
    console.log("findByUsername called in user service")

    return this.usersRepository.findOne({
      where: [
        { email: identifier },
        { username: identifier }
      ]
    });
  }




  async findByUsername(username: string): Promise<User | null> {
    console.log("findByUsername called in user service")

    return this.usersRepository.findOne({ where: { username } });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findUserById(userId: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id: userId } });
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      select: ['id', 'username', 'email', 'role'], // Exclude sensitive fields like password
      relations: ['reservations'], // Include related reservations if needed
    });
  }



}
