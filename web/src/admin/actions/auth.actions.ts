import { api } from "../utils/handleClient/api";

export interface ILoginData {
  name: string;
  password?: string;
}

export const authActions = {
  async authenticate(data: ILoginData) {
    const response = await api.post("/sessions", data);
    return response.data;
  },

  async me() {
    const response = await api.get("/me");
    return response.data;
  },
};
