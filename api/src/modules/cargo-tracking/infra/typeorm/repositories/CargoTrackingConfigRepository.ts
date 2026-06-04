import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CargoTrackingConfig } from "../../../domain/entities/CargoTrackingConfig";
import { ICargoTrackingConfigRepository } from "../../../domain/repositories/ICargoTrackingConfigRepository";

@Injectable()
export class CargoTrackingConfigRepository implements ICargoTrackingConfigRepository {
    constructor(
        @InjectRepository(CargoTrackingConfig)
        private repository: Repository<CargoTrackingConfig>
    ) {}

    async find(): Promise<CargoTrackingConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: CargoTrackingConfig): Promise<CargoTrackingConfig> {
        return this.repository.save(config);
    }
}
