import { api } from "@/admin/utils/handleClient/api";

export const careersActions = {
    async get() {
        const response = await api.get("/careers-config");
        return response.data;
    },

    async update(data: any) {
        const response = await api.post("/careers-config", data);
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
    },

    async submitApplication(data: any, file?: File) {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined && data[key] !== null) {
                formData.append(key, data[key]);
            }
        });
        if (file) {
            formData.append("file", file);
        }
        const response = await api.post("/job-applications", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }
};
