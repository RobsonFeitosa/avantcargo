import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AirRepresentationConfig } from "./domain/entities/AirRepresentationConfig";
import { AirRepresentationConfigRepository } from "./infra/typeorm/repositories/AirRepresentationConfigRepository";
import { GetAirRepresentationConfigUseCase } from "./application/use-cases/GetAirRepresentationConfigUseCase";
import { UpdateAirRepresentationConfigUseCase } from "./application/use-cases/UpdateAirRepresentationConfigUseCase";
import { AirRepresentationConfigController } from "./infra/http/controllers/AirRepresentationConfigController";

@Module({
    imports: [TypeOrmModule.forFeature([AirRepresentationConfig])],
    providers: [
        {
            provide: 'IAirRepresentationConfigRepository',
            useClass: AirRepresentationConfigRepository,
        },
        GetAirRepresentationConfigUseCase,
        UpdateAirRepresentationConfigUseCase,
    ],
    controllers: [AirRepresentationConfigController],
})
export class AirRepresentationModule {}
