import { Inject, Injectable } from "@nestjs/common";
import { ICargoTrackingConfigRepository } from "../../domain/repositories/ICargoTrackingConfigRepository";
import { CargoTrackingConfig } from "../../domain/entities/CargoTrackingConfig";

@Injectable()
export class UpdateCargoTrackingConfigUseCase {
    constructor(
        @Inject('ICargoTrackingConfigRepository')
        private repository: ICargoTrackingConfigRepository
    ) {}

    async execute(data: any): Promise<CargoTrackingConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new CargoTrackingConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
