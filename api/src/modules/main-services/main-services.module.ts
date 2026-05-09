import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MainServiceConfig } from "./domain/entities/main-service-config.entity";
import { MainServicesController } from "./infra/http/controllers/main-services.controller";
import { GetMainServicesUseCase } from "./application/get-main-services.use-case";
import { UpdateMainServicesUseCase } from "./application/update-main-services.use-case";
import { TypeOrmMainServicesRepository } from "./infra/typeorm/repositories/typeorm-main-services.repository";

@Module({
    imports: [TypeOrmModule.forFeature([MainServiceConfig])],
    controllers: [MainServicesController],
    providers: [
        GetMainServicesUseCase,
        UpdateMainServicesUseCase,
        {
            provide: 'MAIN_SERVICES_REPOSITORY_TOKEN',
            useClass: TypeOrmMainServicesRepository,
        },
    ],
    exports: [GetMainServicesUseCase],
})
export class MainServicesModule {}
