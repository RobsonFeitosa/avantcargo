import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MainBanner } from "./domain/entities/main-banner.entity";
import { MainBannerController } from "./infra/http/controllers/main-banner.controller";
import { GetMainBannerUseCase } from "./application/get-main-banner.use-case";
import { UpdateMainBannerUseCase } from "./application/update-main-banner.use-case";
import { TypeOrmMainBannerRepository } from "./infra/typeorm/repositories/typeorm-main-banner.repository";

@Module({
    imports: [TypeOrmModule.forFeature([MainBanner])],
    controllers: [MainBannerController],
    providers: [
        GetMainBannerUseCase,
        UpdateMainBannerUseCase,
        {
            provide: 'MAIN_BANNER_REPOSITORY_TOKEN',
            useClass: TypeOrmMainBannerRepository,
        },
    ],
    exports: [GetMainBannerUseCase],
})
export class MainBannerModule {}
