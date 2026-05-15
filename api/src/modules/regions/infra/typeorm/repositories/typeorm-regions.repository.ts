import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RegionsRepository } from "../../../domain/repositories/regions.repository";
import { RegionConfig } from "../../../domain/entities/region-config.entity";

export class TypeORMRegionsRepository implements RegionsRepository {
    constructor(
        @InjectRepository(RegionConfig)
        private readonly repository: Repository<RegionConfig>
    ) {}

    async findByPage(page: string): Promise<RegionConfig | null> {
        return this.repository.findOne({ where: { page } });
    }

    async save(config: RegionConfig): Promise<RegionConfig> {
        return this.repository.save(config);
    }
}
