// Main application module
// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { ReservationModule } from './reservation/reservation.module';
import { CategoryModule } from './category/category.module';
import { AdminModule } from './admin/admin.module';
import { EmailModule } from './email/email.module';
import { Book } from './book/book.entity';
import { BookCopies } from './book/book-copy.entity';
import { User } from './user/user.entity';
import { RefreshToken } from './auth/refresh-token.entity';
import { Category } from './category/category.entity';
import { Reservation } from './reservation/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // entities: [User,Book,BookCopies,RefreshToken,Category,Reservation],

        synchronize: configService.get<boolean>('DB_SYNC', false),
      }),
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UserModule,
    BookModule,
    ReservationModule,
    CategoryModule,
    AdminModule,
    EmailModule,
  ],
})
export class AppModule {}