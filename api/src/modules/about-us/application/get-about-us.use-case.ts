import { Inject, Injectable } from "@nestjs/common";
import { AboutUsRepository } from "../domain/repositories/about-us.repository";

@Injectable()
export class GetAboutUsUseCase {
    constructor(
        @Inject('ABOUT_US_REPOSITORY_TOKEN')
        private readonly aboutUsRepository: AboutUsRepository
    ) {}

    async execute() {
        return this.aboutUsRepository.find();
    }
}
