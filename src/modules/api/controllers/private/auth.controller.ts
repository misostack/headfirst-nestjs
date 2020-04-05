import { Controller, Get, Post, Patch, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthValidateDTO } from '@api/dtos/auth.dto';
import { AuthValidateData } from '@api/interfaces';


@ApiBearerAuth()
@ApiTags('private', 'auth')
@Controller('private/auth')
export class AuthController {
  // Create a new jwt token
  @Post('validate')
  validate(@Body() payload: AuthValidateDTO) : AuthValidateData{
    return {
      token: '',
      expiredAt: 100,
      refreshToken: '',
      firebaseToken: '',
      user: {id: 1}
    }
  }
}