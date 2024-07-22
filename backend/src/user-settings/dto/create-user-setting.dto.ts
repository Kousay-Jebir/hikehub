import { IsBoolean, IsNumber } from 'class-validator';

export class CreateUserSettingDto {
  @IsBoolean()
  phoneNumberPrivacy: boolean;

  @IsBoolean()
  birthdayPrivacy: boolean;

  @IsBoolean()
  isAcceptingFriendRequests: boolean;

  @IsBoolean()
  isEmailExposed: boolean;

  @IsNumber()
  userProfileId: number;
}
