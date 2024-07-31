import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Entity()
export class Participation {
  @PrimaryColumn()
  eventId: number;

  @PrimaryColumn()
  userProfileId: number;

  @Column({ default: false })
  didAttend: boolean;

  @ManyToOne(() => Event, event => event.participants)
  event: Event;

  @ManyToOne(() => UserProfile, userProfile => userProfile.participations)
  userProfile: UserProfile;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;
}
