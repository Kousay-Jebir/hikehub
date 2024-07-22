import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserProfile } from 'src/user-profiles/entities/user-profile.entity';
import { OrganizationProfile } from 'src/organization-profiles/entities/organization-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  userName: string;

  @Column("simple-array")
  roles: string;

  @OneToOne(() => UserProfile, userProfile => userProfile.user)
  userProfile: UserProfile;

  @OneToOne(() => OrganizationProfile, organizationProfile => organizationProfile.user)
  organizationProfile: OrganizationProfile;
}
