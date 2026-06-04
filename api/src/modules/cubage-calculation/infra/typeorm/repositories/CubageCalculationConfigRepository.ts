import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CubageCalculationConfig } from "../../../domain/entities/CubageCalculationConfig";
import { ICubageCalculationConfigRepository } from "../../../domain/repositories/ICubageCalculationConfigRepository";

@Injectable()
export class CubageCalculationConfigRepository implements ICubageCalculationConfigRepository {
    constructor(
        @InjectRepository(CubageCalculationConfig)
        private repository: Repository<CubageCalculationConfig>
    ) {}

    async find(): Promise<CubageCalculationConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: CubageCalculationConfig): Promise<CubageCalculationConfig> {
        return this.repository.save(config);
    }
}
