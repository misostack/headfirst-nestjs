import {
  IsEmail, MinLength, MaxLength, IsNotEmpty, IsOptional
} from 'class-validator';
import { userLang } from '~/user/user.lang';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsEmail({}, { message: userLang.validation.email.invalid })
  @MaxLength(320, { message: '320'})
  email: string;

  @ApiProperty()
  @MinLength(6, {message: '6'})
  @IsNotEmpty({message: 'required'})
  password: string;

  @ApiProperty()
  @MaxLength(60, {message: '60'})
  @IsNotEmpty({message: 'required'})
  firstName: string;

  @ApiProperty()
  @MaxLength(60, {message: '60'})
  @IsNotEmpty({message: 'required'})  
  lastName: string;
}

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: userLang.validation.email.invalid })
  @MaxLength(320, { message: '320'})
  email: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, {message: '6'})
  @IsNotEmpty({message: 'required'})
  password: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(60, {message: '60'})
  @IsNotEmpty({message: 'required'})
  firstName: string;

  @ApiProperty()
  @IsOptional()
  @MaxLength(60, {message: '60'})
  @IsNotEmpty({message: 'required'})  
  lastName: string;
}