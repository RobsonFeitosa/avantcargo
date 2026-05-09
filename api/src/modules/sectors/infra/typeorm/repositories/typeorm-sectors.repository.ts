import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SectorConfig } from "../../../domain/entities/sector-config.entity";
import { SectorsRepository } from "../../../domain/repositories/sectors.repository";

@Injectable()
export class TypeOrmSectorsRepository implements SectorsRepository {
    constructor(
        @InjectRepository(SectorConfig)
        private readonly repository: Repository<SectorConfig>
    ) {}

    async find(): Promise<SectorConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: SectorConfig): Promise<SectorConfig> {
        return this.repository.save(config);
    }
}
