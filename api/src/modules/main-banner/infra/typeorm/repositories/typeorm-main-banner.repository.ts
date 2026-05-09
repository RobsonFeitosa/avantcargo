import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MainBanner } from "../../../domain/entities/main-banner.entity";
import { MainBannerRepository } from "../../../domain/repositories/main-banner.repository";

@Injectable()
export class TypeOrmMainBannerRepository implements MainBannerRepository {
    constructor(
        @InjectRepository(MainBanner)
        private readonly repository: Repository<MainBanner>
    ) {}

    async find(): Promise<MainBanner | null> {
        return this.repository.findOne({ where: {} });
    }

    async save(mainBanner: MainBanner): Promise<MainBanner> {
        return this.repository.save(mainBanner);
    }
}
