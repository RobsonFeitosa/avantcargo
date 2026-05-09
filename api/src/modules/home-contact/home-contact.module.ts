import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeContactConfig } from "./domain/entities/home-contact-config.entity";
import { HomeContactController } from "./infra/http/controllers/home-contact.controller";
import { GetHomeContactUseCase, UpdateHomeContactUseCase } from "./application/home-contact.use-cases";
import { TypeOrmHomeContactRepository } from "./infra/typeorm/repositories/typeorm-home-contact.repository";

@Module({
    imports: [TypeOrmModule.forFeature([HomeContactConfig])],
    controllers: [HomeContactController],
    providers: [
        GetHomeContactUseCase,
        UpdateHomeContactUseCase,
        {
            provide: 'HOME_CONTACT_REPOSITORY_TOKEN',
            useClass: TypeOrmHomeContactRepository,
        },
    ],
    exports: [GetHomeContactUseCase],
})
export class HomeContactModule {}
