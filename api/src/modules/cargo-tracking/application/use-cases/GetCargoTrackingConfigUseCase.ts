import { Inject, Injectable } from "@nestjs/common";
import { ICargoTrackingConfigRepository } from "../../domain/repositories/ICargoTrackingConfigRepository";
import { CargoTrackingConfig } from "../../domain/entities/CargoTrackingConfig";

@Injectable()
export class GetCargoTrackingConfigUseCase {
    constructor(
        @Inject('ICargoTrackingConfigRepository')
        private repository: ICargoTrackingConfigRepository
    ) {}

    async execute(): Promise<CargoTrackingConfig> {
        const existing = await this.repository.find();
        if (existing) return existing;
        return this.repository.save(new CargoTrackingConfig({
            title: "Rastreamento de Carga",
            description: "Acompanhe em tempo real a localização e o status da sua carga. Utilize o campo abaixo para inserir o número de rastreamento e obter informações atualizadas sobre o seu envio.",
        }));
    }
}
