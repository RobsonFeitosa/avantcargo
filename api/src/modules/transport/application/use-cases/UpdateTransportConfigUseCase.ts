import { Inject, Injectable } from "@nestjs/common";
import { ITransportConfigRepository } from "../../domain/repositories/ITransportConfigRepository";
import { TransportConfig } from "../../domain/entities/TransportConfig";

@Injectable()
export class UpdateTransportConfigUseCase {
    constructor(
        @Inject('ITransportConfigRepository')
        private repository: ITransportConfigRepository
    ) {}

    async execute(data: any): Promise<TransportConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new TransportConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
