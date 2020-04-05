import {
  IsEmail, IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthValidateDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({message: 'required'})
  password: string;
}