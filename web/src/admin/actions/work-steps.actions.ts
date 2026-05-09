import { api } from "../utils/handleClient/api";

export const workStepsActions = {
    async get() {
        const response = await api.get("/work-steps");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/work-steps", data);
        return response.data;
    },
};
