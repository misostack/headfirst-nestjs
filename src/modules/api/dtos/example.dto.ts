import {
  IsEmail, MinLength, MaxLength, IsNotEmpty, IsOptional, IsIn
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateExampleDTO {
  @ApiProperty()
  @IsNotEmpty({message: 'required'})
  @MaxLength(60, { message: '60'})
  title: string;

  @ApiProperty()
  @IsNotEmpty({message: 'required'})
  @MaxLength(120, { message: '60'})
  description: string;
  
  @ApiProperty()
  @IsOptional()
  @IsIn(['draft','pending','active','archived'])
  status: string = 'draft';

  @ApiProperty()
  @IsOptional()
  childrenIds: Array<number> = [];
}

export class UpdateUserDTO {
  @ApiProperty()
  @IsOptional()
  @IsEmail({}, { message: 'invalid' })
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