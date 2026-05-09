import { FooterConfig } from "../entities/footer-config.entity";

export interface FooterRepository {
    find(): Promise<FooterConfig | null>;
    save(config: FooterConfig): Promise<FooterConfig>;
}
