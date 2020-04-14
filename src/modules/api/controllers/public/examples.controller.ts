import { Controller, Get, Post, Param, Body, Patch, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { CreateExampleDTO } from '@api/dtos';

@ApiTags('api')
@Controller('examples')
export class ExamplesController {
  constructor(private configService: ConfigService) {

  }
  @Get()
  index(){
    return {
      limit: 5,
      size: 5,
      start: 0,
      _links: {
        base: "/v1/examples",
        first: "/v1/examples?limit=5",
        last: "/v1/examples?limit=5&start=20",
        prev: null,
        next: "/v1/examples?limit=5&start=5",
        self: "/v1/examples"
      },
      results: [
        {
          id: 'abc',
          title: 'Example 1',
          description: 'Example 1 description',
          childrenIds: [1,2,3],
          status: 'draft',
        },
        {
          id: 'def',
          title: 'Example 2',
          description: 'Example 2 description',
          childrenIds: [4,5,6],
          status: 'pending',
        },
        {
          id: 'ghk',
          title: 'Example 3',
          description: 'Example 3 description',
          childrenIds: [7,8,9],
          status: 'active',
        },
        {
          id: 'lgs',
          title: 'Example 4',
          description: 'Example 4 description',
          childrenIds: [10,11,12],
          status: 'archived',
        }                  
      ],
    }
  }

  @Get(':id')
  show(@Param('id') id) {
    const statuses = ['draft', 'pending', 'active', 'archived']
    return {
      id: id,
      title: `Example ${id}`,
      description: `Example ${id} description`,
      childrenIds: [1,2,3],
      status: statuses[id % statuses.length],
    }
  }

  @Post()
  create(@Body() payload: CreateExampleDTO) {  
    return payload
  }

  @Patch(':id')
  update(@Param('id') id, @Body() payload: CreateExampleDTO) {
    return {
      id: id,
      ...payload,      
    }
  }

  @Put(':id')
  replace(@Param('id') id, @Body() payload: CreateExampleDTO) {
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
