import { CubageCalculationConfig } from "../entities/CubageCalculationConfig";

export interface ICubageCalculationConfigRepository {
    find(): Promise<CubageCalculationConfig | null>;
    save(config: CubageCalculationConfig): Promise<CubageCalculationConfig>;
}
