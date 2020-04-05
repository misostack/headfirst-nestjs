import { Column } from 'typeorm';

export class BaseEntity {

    @Column()
    createAt: string;

    @Column()
    updatedAt: string;

}