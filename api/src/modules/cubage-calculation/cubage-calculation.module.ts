import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CubageCalculationConfig } from "./domain/entities/CubageCalculationConfig";
import { CubageCalculationConfigRepository } from "./infra/typeorm/repositories/CubageCalculationConfigRepository";
import { GetCubageCalculationConfigUseCase } from "./application/use-cases/GetCubageCalculationConfigUseCase";
import { UpdateCubageCalculationConfigUseCase } from "./application/use-cases/UpdateCubageCalculationConfigUseCase";
import { CubageCalculationConfigController } from "./infra/http/controllers/CubageCalculationConfigController";

@Module({
    imports: [TypeOrmModule.forFeature([CubageCalculationConfig])],
    providers: [
        {
            provide: 'ICubageCalculationConfigRepository',
            useClass: CubageCalculationConfigRepository,
        },
        GetCubageCalculationConfigUseCase,
        UpdateCubageCalculationConfigUseCase,
    ],
    controllers: [CubageCalculationConfigController],
})
export class CubageCalculationModule {}
