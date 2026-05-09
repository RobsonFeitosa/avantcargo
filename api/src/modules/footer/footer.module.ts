import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FooterConfig } from "./domain/entities/footer-config.entity";
import { FooterController } from "./infra/http/controllers/footer.controller";
import { GetFooterUseCase, UpdateFooterUseCase } from "./application/footer.use-cases";
import { TypeOrmFooterRepository } from "./infra/typeorm/repositories/typeorm-footer.repository";

@Module({
    imports: [TypeOrmModule.forFeature([FooterConfig])],
    controllers: [FooterController],
    providers: [
        GetFooterUseCase,
        UpdateFooterUseCase,
        {
            provide: 'FOOTER_REPOSITORY_TOKEN',
            useClass: TypeOrmFooterRepository,
        },
    ],
    exports: [GetFooterUseCase],
})
export class FooterModule {}
