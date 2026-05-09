import { api } from "../utils/handleClient/api";

export const mainServicesActions = {
    async get() {
        const response = await api.get("/main-services");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/main-services", data);
        return response.data;
    },
};
