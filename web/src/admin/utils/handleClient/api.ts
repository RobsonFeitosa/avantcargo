import axios from "axios"
import { parseCookies } from "nookies"
import qs from "qs"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  paramsSerializer: (params) => {
    return qs.stringify(params)
  },
})

api.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined" && config.headers) {
    const cookies = parseCookies()
    const {
      '@AvantCargo:token': tokenStorage,
    } = cookies

    if (tokenStorage) {
      config.headers["Authorization"] = `Bearer ${tokenStorage}`
    }
  }

  return config
})
