import {
  IsString,
  IsEmail,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsDateString,
  IsInt,
  Length,
  Min,
  Max,
} from 'class-validator';
import { UserStatus, Gender } from '../../../common/enums/user.enum';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 100)
  password: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  nickname?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(120)
  age?: number;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDateString()
  dob?: string;

  @IsOptional()
  @IsBoolean()
  verifyMail?: boolean;

  @IsOptional()
  @IsBoolean()
  verifyPhone?: boolean;

  @IsOptional()
  @IsString()
  @Length(6, 15)
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}
