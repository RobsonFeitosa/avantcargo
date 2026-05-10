import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ComexSystemsConfig } from "./domain/entities/ComexSystemsConfig";
import { ComexSystemsConfigRepository } from "./infra/typeorm/repositories/ComexSystemsConfigRepository";
import { GetComexSystemsConfigUseCase } from "./application/use-cases/GetComexSystemsConfigUseCase";
import { UpdateComexSystemsConfigUseCase } from "./application/use-cases/UpdateComexSystemsConfigUseCase";
import { ComexSystemsConfigController } from "./infra/http/controllers/ComexSystemsConfigController";

@Module({
    imports: [TypeOrmModule.forFeature([ComexSystemsConfig])],
    providers: [
        {
            provide: 'IComexSystemsConfigRepository',
            useClass: ComexSystemsConfigRepository,
        },
        GetComexSystemsConfigUseCase,
        UpdateComexSystemsConfigUseCase,
    ],
    controllers: [ComexSystemsConfigController],
})
export class ComexSystemsModule {}
