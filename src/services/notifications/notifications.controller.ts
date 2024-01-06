// src/services/notifications/notifications.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/get-all-notifications')
  async getAllNotifications() {
    return this.notificationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-user-notifications')
  async getNotificationsByUserId(@GetUser() user: User) {
    return this.notificationsService.findNotificationsByUserId(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete-notification')
  async deleteNotification(
    @GetUser() user: User,
    @Body('notificationId') notificationId: number,
  ) {
    return this.notificationsService.deleteNotification(
      notificationId,
      user.id,
    );
  }
}
