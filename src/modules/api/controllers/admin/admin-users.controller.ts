import { Controller, Get, Post, Patch, Delete, Body, Param, Put, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import {
  CreateAdminUserDTO,
  AdminUserDTO,
  UpdateAdminUserDTO,
} from '@api/dtos';

import { 
  AdminUserService,
} from '@api/services';



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
    isArray: true,
    type: AdminUserDTO,
  })  
  index() {
    // refs : https://developer.atlassian.com/server/confluence/pagination-in-the-rest-api/
    // https://dzone.com/articles/creating-a-rest-api-manual-pagination-sorting-and
    return this.adminUserService.findAll();
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
