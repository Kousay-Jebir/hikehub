import { Entity, PrimaryGeneratedColumn, Column, ManyToOne ,Unique} from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  userId: number;

  @Column('text')
  comment: string;

  @Column('decimal', { precision: 2, scale: 1 })
  stars: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ nullable: true })
  commentEditedAt: Date;

  @ManyToOne(() => Event, event => event.reviews)
  event: Event;

  @ManyToOne(() => UserProfile, userProfile => userProfile.reviews)
  userProfile: UserProfile;
}
