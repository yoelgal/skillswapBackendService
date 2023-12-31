import { Controller, Get, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { GetUser } from '../../utils/get-user.decorator';
import { User } from '../../entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/all')
  async getAllNotifications() {
    return this.notificationsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user')
  async getNotificationsByUserId(@GetUser() user: User) {
    return this.notificationsService.findNotificationsByUserId(user.id);
  }
}
