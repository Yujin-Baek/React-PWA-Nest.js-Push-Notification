import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getHello() {
    return { message: 'Hello World!' };
  }
  @Post('subscribe')
  subscribe(@Body() subscription: any) {
    // 구독 정보 저장 로직 (예: 데이터베이스)
    // 예시로 구독 정보를 로깅
    console.log('Subscription received:', subscription);
    return { message: 'Subscription accepted.' };
  }

  @Post('send')
  sendNotification(@Body() subscription: any) {
    this.notificationService.sendNotification(subscription);
    return { message: 'Notification sent.' };
  }
}
