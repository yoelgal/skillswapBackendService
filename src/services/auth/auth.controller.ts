// src/auth/auth.controller.ts

import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { MailService } from './mail.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private mailService: MailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('send-email')
  async sendEmail(@Body('recipient') recipient: string) {
    try {
      await this.mailService.sendVerificationMail(recipient);
      return { message: 'Email sent successfully' };
    } catch (err) {
      return { message: err.message };
    }
  }

  @Post('verify-token')
  async verifyToken(@Body('token') token: string) {
    return await this.mailService.decodeToken(token);
  }
}
