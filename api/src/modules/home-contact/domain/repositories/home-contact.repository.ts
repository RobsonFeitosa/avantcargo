import { HomeContactConfig } from "../entities/home-contact-config.entity";

export interface HomeContactRepository {
    find(): Promise<HomeContactConfig | null>;
    save(config: HomeContactConfig): Promise<HomeContactConfig>;
}
