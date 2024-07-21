import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Entity()
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  didAttend: boolean;

  @Column()
  eventId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Event, event => event.participants)
  event: Event;

  @ManyToOne(() => UserProfile, userProfile => userProfile.participations)
  userProfile: UserProfile;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;
}
