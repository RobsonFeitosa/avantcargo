import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneralContactConfig } from "./domain/entities/general-contact-config.entity";
import { GeneralContactConfigRepository } from "./infra/typeorm/repositories/GeneralContactConfigRepository";
import { GetGeneralContactConfigUseCase } from "./application/use-cases/GetGeneralContactConfigUseCase";
import { UpdateGeneralContactConfigUseCase } from "./application/use-cases/UpdateGeneralContactConfigUseCase";
import { GeneralContactController } from "./infra/http/controllers/GeneralContactController";

@Module({
    imports: [TypeOrmModule.forFeature([GeneralContactConfig])],
    providers: [
        {
            provide: 'IGeneralContactConfigRepository',
            useClass: GeneralContactConfigRepository,
        },
        GetGeneralContactConfigUseCase,
        UpdateGeneralContactConfigUseCase,
    ],
    controllers: [GeneralContactController],
    exports: [GetGeneralContactConfigUseCase],
})
export class GeneralContactModule {}
