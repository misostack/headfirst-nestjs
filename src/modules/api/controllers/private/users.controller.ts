import { Controller, Get, Post, Patch, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {
  CreateUserDTO,
  UpdateUserDTO,
} from '@api/dtos';


@ApiBearerAuth()
@ApiTags('private', 'users')
@Controller('private/users')
export class UsersController {
  constructor(
    private configService: ConfigService
  ){}

  @Get()
  index() {
    // refs : https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/
    // https://dzone.com/articles/creating-a-rest-api-manual-pagination-sorting-and
    return {
      environment: this.configService.get<string>('environment'),
      limit: 5,
      size: 5,
      start: 5,
      _links: {
        base: "/v1/users",
        first: "/v1/user?limit=5",
        last: "/v1/users?limit=5&start=20",
        prev: null,
        next: "/v1/users?limit=5&start=5",
        self: "/v1/users"
      },
      results: [
        {
          id: 1,
          firstName: 'Son',
          lastName: 'Nguyen',
          name: 'sonnguyen',
          email: 'techlead@sonnm.com',
          status: 'active',
          userType: 'system',
          userGroup: 'sadmin',
        }
      ],      
    }
  }

  @Get(':id')
  show() {

  }

  @Post()
  create(@Body() payload: CreateUserDTO) {  
    return payload
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
