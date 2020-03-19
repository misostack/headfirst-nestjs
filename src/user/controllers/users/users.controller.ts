import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from '~/user/models/dto';
import { UpdateUserDto } from '~/user/models/dto/user.dto';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UsersController {
  // Common routes
  @Get()
  index() {
    // refs : https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/
    // https://dzone.com/articles/creating-a-rest-api-manual-pagination-sorting-and
    return {
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
  create(@Body() payload: CreateUserDto) {  
    return payload
  }

  @Patch(':id')
  update(@Param('id') id, @Body() payload: UpdateUserDto) {
    return {
      id: id,
      ...payload,      
    }
  }

  @Delete(':id')
  destroy(@Param('id') id) {
    return {id: id}
  }

  // Others
  @Get()
  me() {
    
  }  
}
