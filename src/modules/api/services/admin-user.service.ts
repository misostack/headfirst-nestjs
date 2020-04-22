import { Injectable, Inject } from '@nestjs/common';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { AdminUser } from '@api/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminUserDTO, UpdateAdminUserDTO } from '@api/dtos';
import { UserStatusEnum } from '../enums';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AdminUserService {

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findAll(): Promise<any> {
    return (await this.adminUserRepository.find()).map(data => classToPlain(data));
  }

  async findOneByEmail(email: string) {
    return this.adminUserRepository.findOne({ email: email });
  }

  async findOneById(id: string) {
    const adminUser = await this.adminUserRepository.findOne(id);
    return classToPlain(adminUser);
  }

  async create(payload: CreateAdminUserDTO) {
    let adminUser = new AdminUser({
      ...payload,
      status: UserStatusEnum.ACTIVE,
    });    
    adminUser = await this.adminUserRepository.save(adminUser);
    return classToPlain(adminUser);
  }

  async updateOne(id: string, payload: UpdateAdminUserDTO) {
    let toUpdate = await this.adminUserRepository.findOne(id);
    let updated = Object.assign(toUpdate, payload);
    const adminUser = await this.adminUserRepository.save(updated);
    return classToPlain(adminUser);
  }

  async delete(id: string) : Promise<DeleteResult>{
    return await this.adminUserRepository.delete(id);
  }
}
