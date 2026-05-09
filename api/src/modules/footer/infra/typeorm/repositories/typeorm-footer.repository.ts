import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FooterConfig } from "../../../domain/entities/footer-config.entity";
import { FooterRepository } from "../../../domain/repositories/footer.repository";

@Injectable()
export class TypeOrmFooterRepository implements FooterRepository {
    constructor(
        @InjectRepository(FooterConfig)
        private readonly repository: Repository<FooterConfig>
    ) {}

    async find(): Promise<FooterConfig | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(config: FooterConfig): Promise<FooterConfig> {
        return this.repository.save(config);
    }
}
