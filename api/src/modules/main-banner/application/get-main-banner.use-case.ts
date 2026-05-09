import { Inject, Injectable } from "@nestjs/common";
import { MainBannerRepository } from "../domain/repositories/main-banner.repository";

@Injectable()
export class GetMainBannerUseCase {
    constructor(
        @Inject('MAIN_BANNER_REPOSITORY_TOKEN')
        private readonly mainBannerRepository: MainBannerRepository
    ) {}

    async execute() {
        return this.mainBannerRepository.find();
    }
}
