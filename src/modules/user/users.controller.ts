import { Controller, Get, Post, Patch, Delete, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { 
  CreateUserDto,
  UpdateUserDto,
} from '@user/dtos';
import { ConfigService } from '@nestjs/config';

@ApiBearerAuth()
@ApiTags('users')
@Controller()
export class UsersController {
  constructor(
    private configService: ConfigService
  ){

  }
  // Common routes
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

  @Put(':id')
  replace(@Param('id') id, @Body() payload: UpdateUserDto) {
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
