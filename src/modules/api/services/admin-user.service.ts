import { Injectable, Inject } from '@nestjs/common';
import { Repository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { AdminUser } from '@api/entities';
import { UserStatusEnum } from '@api/enums';
import { CreateAdminUserDTO, UpdateAdminUserDTO, AdminUserDTO } from '@api/dtos';

@Injectable()
export class AdminUserService {

  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: Repository<AdminUser>,
  ) {}

  async findAll(options: IPaginationOptions, s: string): Promise<Pagination<AdminUserDTO>> {
    // return paginate<AdminUser>(this.adminUserRepository, options);
    const queryBuilder = this.adminUserRepository.createQueryBuilder('c');
    s = s.trim();
    if(s.length > 0) {
      queryBuilder.orWhere('email like :s', {s: `%${s}%`});
      queryBuilder.orWhere('first_name like :s', {s: `%${s}%`});
      queryBuilder.orWhere('last_name like :s', {s: `%${s}%`});
    }
    let records = await paginate<AdminUserDTO>(queryBuilder, options);
    const items = classToPlain(records.items);
    records = Object.assign(records, {items: items});
    return records;
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
