import { ComexSystemsConfig } from "../entities/ComexSystemsConfig";

export interface IComexSystemsConfigRepository {
    find(): Promise<ComexSystemsConfig | null>;
    save(config: ComexSystemsConfig): Promise<ComexSystemsConfig>;
}
