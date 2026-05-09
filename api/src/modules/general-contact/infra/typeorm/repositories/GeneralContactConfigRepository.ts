import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GeneralContactConfig } from "../../../domain/entities/general-contact-config.entity";
import { IGeneralContactConfigRepository } from "../../../domain/repositories/IGeneralContactConfigRepository";

@Injectable()
export class GeneralContactConfigRepository implements IGeneralContactConfigRepository {
    constructor(
        @InjectRepository(GeneralContactConfig)
        private repository: Repository<GeneralContactConfig>
    ) {}

    async get(): Promise<GeneralContactConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(data: GeneralContactConfig): Promise<GeneralContactConfig> {
        return this.repository.save(data);
    }
}
