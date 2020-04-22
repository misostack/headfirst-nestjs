import { Injectable, Inject } from '@nestjs/common';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AdminUser } from '@api/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminUserDTO } from '@api/dtos';
import { UserStatusEnum } from '../enums';

@Injectable()
export class AdminUserService {

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findAll(): Promise<AdminUser[]> {
    return this.adminUserRepository.find();
  }  

  async create(payload: CreateAdminUserDTO) {
    let adminUser = new AdminUser();
    adminUser.email = payload.email.toLowerCase();
    adminUser.firstName = payload.firstName.toLowerCase();
    adminUser.lastName = payload.lastName.toLowerCase();
    adminUser.password = payload.password;
    adminUser.role = payload.role;
    adminUser.status = UserStatusEnum.ACTIVE;
    return this.adminUserRepository.save(adminUser);
  }
}
