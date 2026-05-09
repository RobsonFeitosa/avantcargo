import { api } from "../utils/handleClient/api";

export const aboutUsActions = {
    async get() {
        const response = await api.get("/about-us");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/about-us", data);
        return response.data;
    },
};
