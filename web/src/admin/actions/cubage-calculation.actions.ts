import { api } from "@/admin/utils/handleClient/api";

export const cubageCalculationActions = {
    async get() {
        const response = await api.get("/cubage-calculation-config");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/cubage-calculation-config", data);
        return response.data;
    },
};
