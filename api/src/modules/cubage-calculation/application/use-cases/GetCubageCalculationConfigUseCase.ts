import { Inject, Injectable } from "@nestjs/common";
import { ICubageCalculationConfigRepository } from "../../domain/repositories/ICubageCalculationConfigRepository";
import { CubageCalculationConfig } from "../../domain/entities/CubageCalculationConfig";

@Injectable()
export class GetCubageCalculationConfigUseCase {
    constructor(
        @Inject('ICubageCalculationConfigRepository')
        private repository: ICubageCalculationConfigRepository
    ) {}

    async execute(): Promise<CubageCalculationConfig> {
        const existing = await this.repository.find();
        if (existing) return existing;
        return this.repository.save(new CubageCalculationConfig({
            title: "Cálculo de Cubagem",
            description: "Cubagem é a relação entre o peso e o volume da carga a ser transportada. Para calcular a cubagem, é utilizada a fórmula:\nAltura x largura x profundidade x fator de cubagem. No caso do transporte rodoviário, o fator de cubagem padrão corresponde a 300.\n\nNo formulário abaixo você pode calcular a cubagem de sua carga.\n\n* No caso de o Peso Cubado ser maior que o Peso Real, consideramos o Peso Cubado."
        }));
    }
}
