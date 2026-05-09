import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AboutUsConfig } from "../../../domain/entities/about-us-config.entity";
import { AboutUsRepository } from "../../../domain/repositories/about-us.repository";

@Injectable()
export class TypeOrmAboutUsRepository implements AboutUsRepository {
    constructor(
        @InjectRepository(AboutUsConfig)
        private readonly repository: Repository<AboutUsConfig>
    ) {}

    async find(): Promise<AboutUsConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: AboutUsConfig): Promise<AboutUsConfig> {
        return this.repository.save(config);
    }
}
