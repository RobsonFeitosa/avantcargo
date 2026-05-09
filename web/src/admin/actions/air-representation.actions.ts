import { api } from "@/admin/utils/handleClient/api";

export const airRepresentationActions = {
    async get() {
        const response = await api.get("/air-representation-config");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/air-representation-config", data);
        return response.data;
    },

    async uploadImage(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await api.post("/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
};
