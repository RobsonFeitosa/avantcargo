import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AirRepresentationConfig } from "../../../domain/entities/AirRepresentationConfig";
import { IAirRepresentationConfigRepository } from "../../../domain/repositories/IAirRepresentationConfigRepository";

@Injectable()
export class AirRepresentationConfigRepository implements IAirRepresentationConfigRepository {
    constructor(
        @InjectRepository(AirRepresentationConfig)
        private repository: Repository<AirRepresentationConfig>
    ) {}

    async find(): Promise<AirRepresentationConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: AirRepresentationConfig): Promise<AirRepresentationConfig> {
        return this.repository.save(config);
    }
}
