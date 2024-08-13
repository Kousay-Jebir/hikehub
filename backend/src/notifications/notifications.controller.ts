import { Controller, Sse, Param, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Observable, map } from 'rxjs';
import { MessageEvent } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Sse('sse/:organizerId')
  sse(@Param('organizerId') organizerId: number): Observable<MessageEvent> {
    // Register the organizer for notifications
    const notifications$ = this.notificationsService.registerOrganizer(organizerId);

    return notifications$.pipe(
      map(message => ({ data: message }))
    );
  }

  @Get(':organizerId')
  async getNotifications(@Param('organizerId') organizerId: number) {
    const notifications = await this.notificationsService.getNotifications(organizerId);
    return notifications.map(notification => ({
      id: notification.id,
      message: notification.message,
      createdAt: notification.createdAt,
    }));
  }
}
