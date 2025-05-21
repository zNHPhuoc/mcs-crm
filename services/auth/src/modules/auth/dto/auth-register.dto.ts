import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';
import {
  IsEmailUnique,
  IsPhoneNumberUnique,
  IsUsernameUnique,
} from '../../../common/validators/unique-field.validator';
import { Match } from '../../../common/validators/match.decorator';

export class AuthRegisterDto {
  @ApiProperty({ example: 'user@email.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @IsEmailUnique({ message: 'email is already registered' })
  @Length(3, 255)
  email: string;

  @ApiProperty({ example: 'username' })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @IsUsernameUnique({ message: 'username already taken' })
  username: string;

  @ApiProperty({ example: 'Pw@123' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 255)
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'Pw@123' })
  @Length(6, 100)
  @IsNotEmpty()
  @IsString()
  @Match('password', {
    message: 'confirmPassword must match password',
  })
  confirmPassword: string;

  @ApiProperty({ example: '+1234567890' })
  @IsNotEmpty()
  @IsString()
  @Length(10, 11)
  @IsPhoneNumberUnique({ message: 'phoneNumber already in use' })
  phoneNumber: string;

  @ApiProperty({ example: 'full Name' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  fullName: string;
}
