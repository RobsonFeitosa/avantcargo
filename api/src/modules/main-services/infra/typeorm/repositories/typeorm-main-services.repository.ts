import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MainServiceConfig } from "../../../domain/entities/main-service-config.entity";
import { MainServicesRepository } from "../../../domain/repositories/main-services.repository";

@Injectable()
export class TypeOrmMainServicesRepository implements MainServicesRepository {
    constructor(
        @InjectRepository(MainServiceConfig)
        private readonly repository: Repository<MainServiceConfig>
    ) {}

    async find(): Promise<MainServiceConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: MainServiceConfig): Promise<MainServiceConfig> {
        return this.repository.save(config);
    }
}
