import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TransportConfig } from "../../../domain/entities/TransportConfig";
import { ITransportConfigRepository } from "../../../domain/repositories/ITransportConfigRepository";

@Injectable()
export class TransportConfigRepository implements ITransportConfigRepository {
    constructor(
        @InjectRepository(TransportConfig)
        private repository: Repository<TransportConfig>
    ) {}

    async find(): Promise<TransportConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: TransportConfig): Promise<TransportConfig> {
        return this.repository.save(config);
    }
}
