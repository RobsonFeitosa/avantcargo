import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { User } from "../../../domain/entities/user.entity";
import type { UserRepository } from "../../../domain/repositories/user.repository";
import type { FilterOptions } from '../../../domain/types/filter-options';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
    constructor(
        private readonly ormRepo: Repository<User>
    ) { }


    async create(user: User): Promise<User> {
        const saved = await this.ormRepo.save(user);
        return saved;
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.ormRepo.findOne({
            where: { id },
        });

        return entity;
    }

    async findByName(name: string): Promise<User | null> {
        const entity = await this.ormRepo.findOne({
            where: { name },
        });

        return entity;
    }

    async findAll(filterOptions: FilterOptions): Promise<[User[], number]> {
        const { page = 1, limit = 10, search, role } = filterOptions;

        const skip = (page - 1) * limit;

        const baseWhere: any = role ? { role } : {};

        const [users, total] = await this.ormRepo.findAndCount({
            take: limit,
            skip,
            order: { name: 'ASC' },
            where: search
                ? [
                    { ...baseWhere, name: ILike(`%${search}%`) },
                ]
                : baseWhere || undefined,
        });

        return [users, total]
    }

    async delete(id: string): Promise<void> {
        await this.ormRepo.delete(id);
    }

    async save(user: User): Promise<User> {
        const saved = await this.ormRepo.save(user);
        return saved;
    }
}