import { api } from "@/admin/utils/handleClient/api";

export const comexSystemsActions = {
    async get() {
        const response = await api.get("/comex-systems-config");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/comex-systems-config", data);
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
