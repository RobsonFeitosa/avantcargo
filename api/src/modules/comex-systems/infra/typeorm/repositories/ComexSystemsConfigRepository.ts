import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ComexSystemsConfig } from "../../../domain/entities/ComexSystemsConfig";
import { IComexSystemsConfigRepository } from "../../../domain/repositories/IComexSystemsConfigRepository";

@Injectable()
export class ComexSystemsConfigRepository implements IComexSystemsConfigRepository {
    constructor(
        @InjectRepository(ComexSystemsConfig)
        private repository: Repository<ComexSystemsConfig>
    ) {}

    async find(): Promise<ComexSystemsConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: ComexSystemsConfig): Promise<ComexSystemsConfig> {
        return this.repository.save(config);
    }
}
