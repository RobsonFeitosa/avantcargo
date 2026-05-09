import { Inject, Injectable } from "@nestjs/common";
import { MainServicesRepository } from "../domain/repositories/main-services.repository";
import { MainServiceConfig } from "../domain/entities/main-service-config.entity";

export interface UpdateMainServicesRequest {
    headerBadge?: string;
    headerTitle?: string;
    headerDescription?: string;
    services?: { id: string; badge?: string; title: string; desc: string }[];
}

@Injectable()
export class UpdateMainServicesUseCase {
    constructor(
        @Inject('MAIN_SERVICES_REPOSITORY_TOKEN')
        private readonly mainServicesRepository: MainServicesRepository
    ) {}

    async execute(request: UpdateMainServicesRequest) {
        let config = await this.mainServicesRepository.find();

        if (!config) {
            config = new MainServiceConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.mainServicesRepository.save(config);
    }
}
