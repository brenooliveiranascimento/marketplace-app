import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "axios";
import { UserStore } from "@/store/userStore";

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const userData = await AsyncStorage.getItem("dt-money-user");
    if (userData) {
      const { token } = JSON.parse(userData) as UserStore;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });
};
