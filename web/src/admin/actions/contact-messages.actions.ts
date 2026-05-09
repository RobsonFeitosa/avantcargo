import { api } from "../utils/handleClient/api";

export const contactMessagesActions = {
    async list() {
        const response = await api.get("/contact-messages");
        return response.data;
    },

    async delete(id: string) {
        const response = await api.delete(`/contact-messages/${id}`);
        return response.data;
    },

    async create(data: any) {
        const response = await api.post("/contact-messages", data);
        return response.data;
    },

    async markAsRead(id: string) {
        const response = await api.patch(`/contact-messages/${id}/read`);
        return response.data;
    }
};
