import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HomeContactConfig } from "../../../domain/entities/home-contact-config.entity";
import { HomeContactRepository } from "../../../domain/repositories/home-contact.repository";

@Injectable()
export class TypeOrmHomeContactRepository implements HomeContactRepository {
    constructor(
        @InjectRepository(HomeContactConfig)
        private readonly repository: Repository<HomeContactConfig>
    ) {}

    async find(): Promise<HomeContactConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: HomeContactConfig): Promise<HomeContactConfig> {
        return this.repository.save(config);
    }
}
