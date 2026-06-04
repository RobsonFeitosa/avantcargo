import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CargoTrackingConfig } from "./domain/entities/CargoTrackingConfig";
import { CargoTrackingConfigRepository } from "./infra/typeorm/repositories/CargoTrackingConfigRepository";
import { GetCargoTrackingConfigUseCase } from "./application/use-cases/GetCargoTrackingConfigUseCase";
import { UpdateCargoTrackingConfigUseCase } from "./application/use-cases/UpdateCargoTrackingConfigUseCase";
import { CargoTrackingConfigController } from "./infra/http/controllers/CargoTrackingConfigController";

@Module({
    imports: [TypeOrmModule.forFeature([CargoTrackingConfig])],
    providers: [
        {
            provide: 'ICargoTrackingConfigRepository',
            useClass: CargoTrackingConfigRepository,
        },
        GetCargoTrackingConfigUseCase,
        UpdateCargoTrackingConfigUseCase,
    ],
    controllers: [CargoTrackingConfigController],
})
export class CargoTrackingModule {}
