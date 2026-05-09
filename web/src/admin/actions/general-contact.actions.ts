import { api } from "../utils/handleClient/api";

export const generalContactActions = {
    async get() {
        const response = await api.get("/general-contact");
        return response.data;
    },
    async update(data: any) {
        const response = await api.post("/general-contact", data);
        return response.data;
    },
};
