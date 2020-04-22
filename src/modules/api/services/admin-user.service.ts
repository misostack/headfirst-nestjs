import { Injectable, Inject } from '@nestjs/common';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AdminUser } from '@api/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminUserDTO } from '@api/dtos';
import { UserStatusEnum } from '../enums';
import { deserialize, classToPlain } from 'class-transformer';

@Injectable()
export class AdminUserService {

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findAll(): Promise<any> {
    return (await this.adminUserRepository.find()).map(data => classToPlain(data));
  }  

  async create(payload: CreateAdminUserDTO) {
    let adminUser = new AdminUser({
      ...payload,
      status: UserStatusEnum.ACTIVE,
    });    
    return this.adminUserRepository.save(adminUser);
  }
}
