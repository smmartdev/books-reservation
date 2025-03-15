import { Injectable } from '@nestjs/common';
import { ReservationService } from '../reservation/reservation.service';

@Injectable()
export class AdminService {
  constructor(private readonly reservationService: ReservationService) {}

  async getOverdueReservations() {
    return this.reservationService.findOverdue();
  }
}
