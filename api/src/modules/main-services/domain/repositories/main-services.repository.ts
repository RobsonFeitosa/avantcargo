import { MainServiceConfig } from "../entities/main-service-config.entity";

export interface MainServicesRepository {
    find(): Promise<MainServiceConfig | null>;
    save(config: MainServiceConfig): Promise<MainServiceConfig>;
}
