import { Inject, Injectable } from "@nestjs/common";
import { ICareersConfigRepository } from "../../domain/repositories/ICareersConfigRepository";
import { CareersConfig } from "../../domain/entities/CareersConfig";

@Injectable()
export class UpdateCareersConfigUseCase {
    constructor(
        @Inject('ICareersConfigRepository')
        private repository: ICareersConfigRepository
    ) {}

    async execute(data: Partial<CareersConfig>): Promise<CareersConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new CareersConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
