import {
  IsEmail, MinLength, MaxLength, IsNotEmpty, IsOptional, IsEnum, ValidatorConstraint, Validate
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminUserRoleEnum, UserStatusEnum } from '@api/enums';
import { IsUnique } from "@api/validators/user.validators";


export class AdminUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty({ enum: AdminUserRoleEnum, isArray: true})
  roles: Array<AdminUserRoleEnum>;

  @ApiProperty({ enum: UserStatusEnum})
  status: UserStatusEnum;  

  @ApiProperty()
  createdAt: number;
  
  @ApiProperty()
  updatedAt: number;  
}

export class CreateAdminUserDTO {
  @ApiProperty()
  @IsEmail({}, { message: 'invalid' })
  @MaxLength(320, { message: '320'})
  @IsUnique(
    { table: "admin_user", column: "email" },
    { message: "exist" }
  )
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

  @ApiProperty({ enum: AdminUserRoleEnum, isArray: true})
  @IsNotEmpty({message: 'required'})
  roles: Array<AdminUserRoleEnum>;
}

export class UpdateAdminUserDTO {
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