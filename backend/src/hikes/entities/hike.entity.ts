import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { Event } from 'src/events/entities/event.entity';

@Entity()
export class Hike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'datetime' })
  startTime: Date;

  @Column({ nullable: true ,type:'datetime'})
  endTime: Date;

  @Column({ nullable: true })
  location: string;

  @ManyToOne(() => Event, event => event.hikes)
  event: Event;

  @OneToMany(() => Location, location => location.hike)
  locations: Location[];
}
