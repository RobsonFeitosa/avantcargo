import { Inject, Injectable } from "@nestjs/common";
import { IGeneralContactConfigRepository } from "../../domain/repositories/IGeneralContactConfigRepository";
import { GeneralContactConfig } from "../../domain/entities/general-contact-config.entity";

@Injectable()
export class UpdateGeneralContactConfigUseCase {
    constructor(
        @Inject('IGeneralContactConfigRepository')
        private generalContactConfigRepository: IGeneralContactConfigRepository
    ) {}

    async execute(data: any) {
        let config = await this.generalContactConfigRepository.get();

        if (!config) {
            config = new GeneralContactConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.generalContactConfigRepository.save(config);
    }
}
