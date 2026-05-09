import { Inject, Injectable } from "@nestjs/common";
import { FooterRepository } from "../domain/repositories/footer.repository";
import { FooterConfig } from "../domain/entities/footer-config.entity";

export interface UpdateFooterRequest {
    description?: string;
    social_links?: { icon: string; link: string }[];
    contact_info?: { address: string; phone: string; email: string };
    footer_links?: { title: string; links: { name: string; path: string }[] }[];
    copyrightText?: string;
    termsLink?: string;
    privacyLink?: string;
}

@Injectable()
export class GetFooterUseCase {
    constructor(
        @Inject('FOOTER_REPOSITORY_TOKEN')
        private readonly footerRepository: FooterRepository
    ) {}

    async execute() {
        return this.footerRepository.find();
    }
}

@Injectable()
export class UpdateFooterUseCase {
    constructor(
        @Inject('FOOTER_REPOSITORY_TOKEN')
        private readonly footerRepository: FooterRepository
    ) {}

    async execute(request: UpdateFooterRequest) {
        let config = await this.footerRepository.find();

        if (!config) {
            config = new FooterConfig(request);
        } else {
            Object.assign(config, request);
        }

        return this.footerRepository.save(config);
    }
}
