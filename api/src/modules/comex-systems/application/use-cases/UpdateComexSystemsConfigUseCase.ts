import { Inject, Injectable } from "@nestjs/common";
import { IComexSystemsConfigRepository } from "../../domain/repositories/IComexSystemsConfigRepository";
import { ComexSystemsConfig } from "../../domain/entities/ComexSystemsConfig";

@Injectable()
export class UpdateComexSystemsConfigUseCase {
    constructor(
        @Inject('IComexSystemsConfigRepository')
        private repository: IComexSystemsConfigRepository
    ) {}

    async execute(data: any): Promise<ComexSystemsConfig> {
        let config = await this.repository.find();

        if (!config) {
            config = new ComexSystemsConfig(data);
        } else {
            Object.assign(config, data);
        }

        return this.repository.save(config);
    }
}
