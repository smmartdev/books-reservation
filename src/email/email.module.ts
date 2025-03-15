// email.module.ts
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@nestjs/config';
import { SchedulerService } from '../scheduler/scheduler.service';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [
    ConfigModule,
    ReservationModule,
  ],
  providers: [EmailService, SchedulerService],
  exports: [EmailService, SchedulerService],
})
export class EmailModule {}