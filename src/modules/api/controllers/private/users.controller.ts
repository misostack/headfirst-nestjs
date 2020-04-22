import { Controller, Get, Post, Patch, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {
  CreateUserDTO,
  UpdateUserDTO,
  CreateAdminUserDTO,
} from '@api/dtos';

import { 
  AdminUserService,
} from '@api/services';


@ApiBearerAuth()
@ApiTags('private', 'users')
@Controller('private/users')
export class UsersController {
  constructor(
    private configService: ConfigService,
    private adminUserService: AdminUserService
  ){}

  @Get()
  index() {
    // refs : https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/
    // https://dzone.com/articles/creating-a-rest-api-manual-pagination-sorting-and
    return this.adminUserService.findAll();
  }

  @Get(':id')
  show() {

  }

  @Post()
  create(@Body() payload: CreateAdminUserDTO) {  
    return this.adminUserService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() payload: UpdateUserDTO) {
    return {
      id: id,
      ...payload,      
    }
  }

  @Put(':id')
  replace(@Param('id') id, @Body() payload: UpdateUserDTO) {
    return {
      id: id,
      ...payload,      
    }
  }  

  @Delete(':id')
  destroy(@Param('id') id) {
    return {id: id}
  }  
}
