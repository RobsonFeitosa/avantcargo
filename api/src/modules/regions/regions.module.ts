import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RegionConfig } from "./domain/entities/region-config.entity";
import { GetRegionsUseCase, UpdateRegionsUseCase } from "./application/regions.use-cases";
import { RegionsController } from "./infra/http/controllers/regions.controller";
import { TypeORMRegionsRepository } from "./infra/typeorm/repositories/typeorm-regions.repository";

@Module({
    imports: [TypeOrmModule.forFeature([RegionConfig])],
    providers: [
        GetRegionsUseCase,
        UpdateRegionsUseCase,
        {
            provide: 'REGIONS_REPOSITORY_TOKEN',
            useClass: TypeORMRegionsRepository,
        },
    ],
    controllers: [RegionsController],
})
export class RegionsModule {}
