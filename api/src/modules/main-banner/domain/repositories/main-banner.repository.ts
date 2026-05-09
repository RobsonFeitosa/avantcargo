import { MainBanner } from "../entities/main-banner.entity";

export interface MainBannerRepository {
    find(): Promise<MainBanner | null>;
    save(mainBanner: MainBanner): Promise<MainBanner>;
}
