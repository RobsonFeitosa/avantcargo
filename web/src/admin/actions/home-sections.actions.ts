import { api } from "../utils/handleClient/api";

export const sectorsActions = {
    async get() {
        const response = await api.get("/sectors");
        return response.data;
    },
    async update(data: any) {
        const response = await api.post("/sectors", data);
        return response.data;
    },
};

export const testimonialsActions = {
    async get() {
        const response = await api.get("/testimonials");
        return response.data;
    },
    async update(data: any) {
        const response = await api.post("/testimonials", data);
        return response.data;
    },
};

export const homeContactActions = {
    async get() {
        const response = await api.get("/home-contact");
        return response.data;
    },
    async update(data: any) {
        const response = await api.post("/home-contact", data);
        return response.data;
    },
};

export const footerActions = {
    async get() {
        const response = await api.get("/footer");
        return response.data;
    },
    async update(data: any) {
        const response = await api.post("/footer", data);
        return response.data;
    },
};
