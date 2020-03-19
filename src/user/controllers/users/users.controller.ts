import { Controller, Get, Post, Put, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

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
  create() {

  }

  @Patch(':id')
  update() {

  }

  @Delete(':id')
  destroy() {

  }

  // Others
  @Get()
  me() {
    
  }  
}
