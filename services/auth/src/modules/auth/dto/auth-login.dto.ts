import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    example: 'user@email.com or username or 0912345678',
    description: 'Can be email, username, or phone number',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  identity: string;

  @ApiProperty({ example: '***********' })
  @IsNotEmpty()
  @IsString()
  @Length(6, 100)
  password: string;
}
