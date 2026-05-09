import { api } from "../utils/handleClient/api";

export interface IMainBannerData {
    heroBadge: string;
    heroTitle: string;
    heroDescription: string;
    heroPrimaryButtonText: string;
    heroSecondaryButtonText: string;
    features: { id: string; text: string }[];
    services: { id: string; title: string; desc: string }[];
    stats: { id: string; value: string; label: string }[];
    footer_stats: { id: string; value: string; label: string }[];
}

export const mainBannerActions = {
    async get() {
        const response = await api.get("/main-banner");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/main-banner", data);
        return response.data;
    },
};
