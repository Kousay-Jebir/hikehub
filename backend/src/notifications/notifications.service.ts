import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class NotificationsService {
  private readonly notificationsSubject: { [key: number]: Subject<string> } = {};

  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
  ) {}

  // Store a new notification
  async addNotification(organizerId: number, message: string) {
    // Persist the notification in the database
    const notification = this.notificationsRepository.create({
      organizerId,
      message,
      createdAt: new Date(),
    });
    await this.notificationsRepository.save(notification);

    // Broadcast the notification to currently connected clients
    if (this.notificationsSubject[organizerId]) {
      this.notificationsSubject[organizerId].next(message);
    }
  }

  // Get notifications for an organizer
  async getNotifications(organizerId: number): Promise<Notification[]> {
    return this.notificationsRepository.find({
      where: { organizerId },
      order: { createdAt: 'DESC' },
    });
  }

  // Register an organizer for notifications
  registerOrganizer(organizerId: number): Observable<string> {
    if (!this.notificationsSubject[organizerId]) {
      this.notificationsSubject[organizerId] = new Subject<string>();
    }
    return this.notificationsSubject[organizerId].asObservable();
  }

  async deleteNotification(id: number): Promise<void> {
    try {
      await this.notificationsRepository.delete(id);
    } catch (error) {
      // Handle error if needed
      throw new Error(`Failed to delete notification with ID ${id}: ${error.message}`);
    }
  }
}
