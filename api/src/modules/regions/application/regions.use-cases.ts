import { Inject, Injectable } from "@nestjs/common";
import { RegionsRepository } from "../domain/repositories/regions.repository";
import { RegionConfig } from "../domain/entities/region-config.entity";

export interface UpdateRegionsRequest {
    title?: string;
    description?: string;
    mapImageUrl?: string;
}

@Injectable()
export class GetRegionsUseCase {
    constructor(
        @Inject('REGIONS_REPOSITORY_TOKEN')
        private readonly regionsRepository: RegionsRepository
    ) {}

    async execute(page: string = 'home') {
        return this.regionsRepository.findByPage(page);
    }
}

@Injectable()
export class UpdateRegionsUseCase {
    constructor(
        @Inject('REGIONS_REPOSITORY_TOKEN')
        private readonly regionsRepository: RegionsRepository
    ) {}

    async execute(page: string, request: UpdateRegionsRequest) {
        let config = await this.regionsRepository.findByPage(page);

        if (!config) {
            config = new RegionConfig({ ...request, page });
        } else {
            Object.assign(config, request);
        }

        return this.regionsRepository.save(config);
    }
}
