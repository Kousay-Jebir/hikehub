import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hike } from 'src/hikes/entities/hike.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hikeId: number;

  @Column()
  label: string;

  @Column('json')
  coordinates: object;

  @ManyToOne(() => Hike, hike => hike.locations)
  hike: Hike;
}
