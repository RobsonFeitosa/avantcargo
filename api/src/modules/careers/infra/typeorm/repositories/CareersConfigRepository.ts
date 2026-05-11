import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CareersConfig } from "../../../domain/entities/CareersConfig";
import { ICareersConfigRepository } from "../../../domain/repositories/ICareersConfigRepository";

@Injectable()
export class CareersConfigRepository implements ICareersConfigRepository {
    constructor(
        @InjectRepository(CareersConfig)
        private repository: Repository<CareersConfig>
    ) {}

    async find(): Promise<CareersConfig | null> {
        const configs = await this.repository.find();
        return configs[0] || null;
    }

    async save(config: CareersConfig): Promise<CareersConfig> {
        return this.repository.save(config);
    }
}
