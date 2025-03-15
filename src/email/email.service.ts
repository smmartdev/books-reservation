import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
  }

  async sendOverdueNotification(email: string, bookTitle: string): Promise<void> {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Overdue Book Return Reminder',
      text: `Dear user, the book "${bookTitle}" is overdue. Please return it as soon as possible.`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
