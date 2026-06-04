import { api } from "@/admin/utils/handleClient/api";

export const cargoTrackingActions = {
    async get() {
        const response = await api.get("/cargo-tracking-config");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/cargo-tracking-config", data);
        return response.data;
    },
};
