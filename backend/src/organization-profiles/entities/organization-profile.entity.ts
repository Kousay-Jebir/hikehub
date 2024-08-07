import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { User } from 'src/users/user.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity()
export class OrganizationProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  name: string;  

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column('json')
  contact: object;

  @Column('json', { nullable: true })
  social: object;

  @OneToOne(() => User, user => user.organizationProfile, { onDelete:'CASCADE'})
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => Event, event => event.organizer)
  events: Event[];
}
