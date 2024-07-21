import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Participation } from 'src/participations/entities/participation.entity';
import { Hike } from 'src/hikes/entities/hike.entity';
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  location: string;

  @Column()
  organizerId: number;

  @ManyToOne(() => OrganizationProfile, organizationProfile => organizationProfile.events)
  organizer: OrganizationProfile;

  @OneToMany(() => Hike, hike => hike.event)
  hikes: Hike[];

  @OneToMany(() => Participation, participation => participation.event)
  participants: Participation[];

  @OneToMany(() => Review, review => review.event)
  reviews: Review[];

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
