import { Controller, Get, Post, Patch, Delete, Body, Param, Put, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {
  CreateAdminUserDTO,
  AdminUserDTO,
  UpdateAdminUserDTO,
} from '@api/dtos';

import { 
  AdminUserService,
} from '@api/services';
import { Pagination } from 'nestjs-typeorm-paginate';
import { AdminUser } from '../../entities';



@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin/users')
export class AdminUsersController {
  constructor(
    private configService: ConfigService,
    private adminUserService: AdminUserService
  ){}

  @Get()
  @ApiResponse({
    status: 200,
  })
  @ApiQuery(
    {name: 'page',required: false,type: 'number'},    
  )
  @ApiQuery(
    {name: 'limit',required: false,type: 'number'},    
  )  
  index(
    @Query('page') page: number = 1, 
    @Query('limit') limit: number = 5,
  ){
    limit = limit > 100 ? 100 : limit;
    return this.adminUserService.findAll({
      page,
      limit,
      route: 'http://cats.com/cats',
    });
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    isArray: false,
    type: AdminUserDTO,
  })  
  show(@Param('id') id: string) {
    return this.adminUserService.findOneById(id);
  }

  @Post()
  create(@Body() payload: CreateAdminUserDTO) {  
    return this.adminUserService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateAdminUserDTO) {
    return this.adminUserService.updateOne(id, payload);
  }

  @Delete(':id')
  destroy(@Param('id') id: string) {
    return this.adminUserService.delete(id);
  }  
}
