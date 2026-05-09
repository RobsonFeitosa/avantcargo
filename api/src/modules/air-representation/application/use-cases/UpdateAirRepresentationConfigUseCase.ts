import { Inject, Injectable } from "@nestjs/common";
import { IAirRepresentationConfigRepository } from "../../domain/repositories/IAirRepresentationConfigRepository";
import { AirRepresentationConfig } from "../../domain/entities/AirRepresentationConfig";

interface UpdateRequest {
    headerBadge?: string;
    headerTitleDark?: string;
    headerTitleHighlight?: string;
    headerDescription?: string;
    importSections?: any[];
    exportSections?: any[];
}

@Injectable()
export class UpdateAirRepresentationConfigUseCase {
    constructor(
        @Inject('IAirRepresentationConfigRepository')
        private repository: IAirRepresentationConfigRepository
    ) {}

    async execute(data: UpdateRequest): Promise<AirRepresentationConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new AirRepresentationConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
