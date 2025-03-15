// refresh-token.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}