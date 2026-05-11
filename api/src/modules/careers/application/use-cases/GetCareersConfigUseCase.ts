import { Inject, Injectable } from "@nestjs/common";
import { ICareersConfigRepository } from "../../domain/repositories/ICareersConfigRepository";
import { CareersConfig } from "../../domain/entities/CareersConfig";

@Injectable()
export class GetCareersConfigUseCase {
    constructor(
        @Inject('ICareersConfigRepository')
        private repository: ICareersConfigRepository
    ) {}

    async execute(): Promise<CareersConfig> {
        const existing = await this.repository.find();
        if (existing) return existing;
        return this.repository.save(new CareersConfig({}));
    }
}
