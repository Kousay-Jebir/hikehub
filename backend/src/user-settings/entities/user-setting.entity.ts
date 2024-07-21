import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';

@Entity()
export class UserSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phoneNumberPrivacy: boolean;

  @Column()
  birthdayPrivacy: boolean;

  @Column()
  isAcceptingFriendRequests: boolean;

  @Column()
  isEmailExposed: boolean;

  @Column({ unique: true })
  userProfileId: number;

  @OneToOne(() => UserProfile, userProfile => userProfile.userSettings)
  @JoinColumn({ name: 'userProfileId' })
  userProfile: UserProfile;
}
