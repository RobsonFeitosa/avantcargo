import { Inject, Injectable } from "@nestjs/common";
import { SectorsRepository } from "../domain/repositories/sectors.repository";
import { SectorConfig } from "../domain/entities/sector-config.entity";

export interface UpdateSectorsRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    sectors?: { id: string; title: string; desc: string; iconName: string }[];
}

@Injectable()
export class GetSectorsUseCase {
    constructor(
        @Inject('SECTORS_REPOSITORY_TOKEN')
        private readonly sectorsRepository: SectorsRepository
    ) {}

    async execute() {
        return this.sectorsRepository.find();
    }
}

@Injectable()
export class UpdateSectorsUseCase {
    constructor(
        @Inject('SECTORS_REPOSITORY_TOKEN')
        private readonly sectorsRepository: SectorsRepository
    ) {}

    async execute(request: UpdateSectorsRequest) {
        let config = await this.sectorsRepository.find();

        if (!config) {
            config = new SectorConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.sectorsRepository.save(config);
    }
}
