import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Entity()
export class Review {
  @PrimaryColumn()
  eventId: number;

  @PrimaryColumn()
  userProfileId: number;

  @Column('text')
  comment: string;

  @Column('decimal', { precision: 2, scale: 1 })
  stars: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  commentEditedAt: Date;

  @ManyToOne(() => Event, event => event.reviews)
  event: Event;

  @ManyToOne(() => UserProfile, userProfile => userProfile.reviews)
  userProfile: UserProfile;
}
