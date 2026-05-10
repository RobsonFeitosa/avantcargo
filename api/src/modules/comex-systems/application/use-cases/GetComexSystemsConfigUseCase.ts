import { Inject, Injectable } from "@nestjs/common";
import { IComexSystemsConfigRepository } from "../../domain/repositories/IComexSystemsConfigRepository";
import { ComexSystemsConfig } from "../../domain/entities/ComexSystemsConfig";

@Injectable()
export class GetComexSystemsConfigUseCase {
    constructor(
        @Inject('IComexSystemsConfigRepository')
        private repository: IComexSystemsConfigRepository
    ) {}

    async execute(): Promise<ComexSystemsConfig | null> {
        return this.repository.find();
    }
}
