import { AboutUsConfig } from "../entities/about-us-config.entity";

export interface AboutUsRepository {
    find(): Promise<AboutUsConfig | null>;
    save(config: AboutUsConfig): Promise<AboutUsConfig>;
}
