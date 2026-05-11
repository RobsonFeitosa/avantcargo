import { Inject, Injectable } from "@nestjs/common";
import { ITransportConfigRepository } from "../../domain/repositories/ITransportConfigRepository";
import { TransportConfig } from "../../domain/entities/TransportConfig";

@Injectable()
export class GetTransportConfigUseCase {
    constructor(
        @Inject('ITransportConfigRepository')
        private repository: ITransportConfigRepository
    ) {}

    async execute(): Promise<TransportConfig> {
        const existing = await this.repository.find();
        if (existing) return existing;
        return this.repository.save(new TransportConfig({}));
    }
}
