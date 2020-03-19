import {
  IsEmail, MinLength, MaxLength, IsNotEmpty, IsOptional
} from 'class-validator';
import { userLang } from '~/user/user.lang';
export class CreateUserDto {
  @IsEmail({}, {
    message: userLang.validation.email.invalid
  })
  @MaxLength(320, {
    message: '320'
  })
  email: string;

  @MinLength(6, {
    message: '6'
  })
  @IsNotEmpty({
    message: 'required'
  })
  password: string;

  @MaxLength(60, {
    message: '60'
  })
  @IsNotEmpty({
    message: 'required'
  })
  firstName: string;

  @MaxLength(60, {
    message: '60'
  })
  @IsNotEmpty({
    message: 'required'
  })  
  lastName: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsEmail({}, {
    message: userLang.validation.email.invalid
  })
  @MinLength(3, {
    message: '3'
  })
  @MaxLength(320, {
    message: '320'
  })
  email: string;

  @IsOptional()
  @MinLength(6, {
    message: '6'
  })
  password: string;

  @IsOptional()
  @MinLength(1, {
    message: '1'
  })
  @MaxLength(60, {
    message: '60'
  })
  @IsNotEmpty({
    message: 'required'
  })
  firstName: string;

  @IsOptional()
  @MinLength(1, {
    message: '1'
  })
  @MaxLength(60, {
    message: '60'
  })
  @IsNotEmpty({
    message: 'required'
  })
  lastName: string;
}