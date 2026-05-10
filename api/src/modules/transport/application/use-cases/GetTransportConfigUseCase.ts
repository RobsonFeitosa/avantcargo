import { Inject, Injectable } from "@nestjs/common";
import { ITransportConfigRepository } from "../../domain/repositories/ITransportConfigRepository";
import { TransportConfig } from "../../domain/entities/TransportConfig";

@Injectable()
export class GetTransportConfigUseCase {
    constructor(
        @Inject('ITransportConfigRepository')
        private repository: ITransportConfigRepository
    ) {}

    async execute(): Promise<TransportConfig | null> {
        return this.repository.find();
    }
}
