import { Inject, Injectable } from "@nestjs/common";
import { ICubageCalculationConfigRepository } from "../../domain/repositories/ICubageCalculationConfigRepository";
import { CubageCalculationConfig } from "../../domain/entities/CubageCalculationConfig";

@Injectable()
export class UpdateCubageCalculationConfigUseCase {
    constructor(
        @Inject('ICubageCalculationConfigRepository')
        private repository: ICubageCalculationConfigRepository
    ) {}

    async execute(data: any): Promise<CubageCalculationConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new CubageCalculationConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
