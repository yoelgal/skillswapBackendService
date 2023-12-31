// src/mail/mail.service.ts

//... other imports
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      // Use environment variables
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),
        pass: this.configService.get<string>('EMAIL_PASS'),
      },
    });
  }

  async sendMail(recipient: string): Promise<void> {
    // Generate a verification token
    const verificationToken = jwt.sign(
      { email: recipient },
      process.env.JWT_SECRET,
      { expiresIn: '10m' },
    );

    // Construct the verification link
    const verificationLink = `https://yourfrontend.com/verify-email?token=${verificationToken}`;

    const mailOptions = {
      from: `"No Reply" <${this.configService.get<string>('EMAIL_USER')}>`,
      to: recipient,
      subject: 'Email Verification',
      html: `
        <b>Click the link below to verify your email for SkillSwap. This link will expire in 10 minutes.</b>
        <br />
        <a href="${verificationLink}">${verificationLink}</a>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async decodeToken(token: string): Promise<any> {
    try {
      const jwtVerify = jwt.verify(token, process.env.JWT_SECRET);
      return {
        message: 'Token is valid',
        data: jwtVerify,
      };
    } catch (err) {
      return {
        message: 'Token is invalid',
        data: null,
      };
    }
  }
}
