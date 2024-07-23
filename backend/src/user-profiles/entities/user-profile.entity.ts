import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from 'src/users/user.entity';
import { UserSetting } from 'src/user-settings/entities/user-setting.entity';
import { Participation } from 'src/participations/entities/participation.entity';
import { Review } from 'src/reviews/entities/review.entity';
@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  nationality: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true, length: 1 })
  genderCode: string;

  @OneToOne(() => User, user => user.userProfile, { onDelete:'CASCADE'})
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToOne(() => UserSetting, userSettings => userSettings.userProfile)
  userSettings: UserSetting;

  @OneToMany(() => Participation, participation => participation.userProfile)
  participations: Participation[];

  @OneToMany(() => Review, review => review.userProfile)
  reviews: Review[];
}