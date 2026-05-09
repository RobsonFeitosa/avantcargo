import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectorConfig } from "./domain/entities/sector-config.entity";
import { SectorsController } from "./infra/http/controllers/sectors.controller";
import { GetSectorsUseCase, UpdateSectorsUseCase } from "./application/sectors.use-cases";
import { TypeOrmSectorsRepository } from "./infra/typeorm/repositories/typeorm-sectors.repository";

@Module({
    imports: [TypeOrmModule.forFeature([SectorConfig])],
    controllers: [SectorsController],
    providers: [
        GetSectorsUseCase,
        UpdateSectorsUseCase,
        {
            provide: 'SECTORS_REPOSITORY_TOKEN',
            useClass: TypeOrmSectorsRepository,
        },
    ],
    exports: [GetSectorsUseCase],
})
export class SectorsModule {}
