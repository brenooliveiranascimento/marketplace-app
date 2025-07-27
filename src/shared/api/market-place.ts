import { UserStore } from "@/store/userStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";

export const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        const userData = await AsyncStorage.getItem("market-place-auth");
        if (userData) {
          const {
            state: { token },
          } = JSON.parse(userData);

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        if (error.response && error.response.data) {
          return Promise.reject(new AppError(error.response.data.message));
        } else {
          return Promise.reject(new AppError("Falha na requisição!"));
        }

        return Promise.reject(error);
      }
    );
  }

  private handleUnauthorized() {
    delete this.instance.defaults.headers.common["Authorization"];
    console.warn("Token expirado. Usuário deve fazer login novamente.");
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }

  setAuthToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.instance.defaults.headers.common["Authorization"];
  }

  get defaults() {
    return this.instance.defaults;
  }
}

export const marketPlaceApiClient = new ApiClient();

// import axios from "axios";
// import { addTokenToRequest } from "../helpers/axios.helper";
// import { Platform } from "react-native";
// import { AppError } from "../helpers/AppError";

// const baseURL = Platform.select({
//   ios: "http://localhost:3001",
//   android: "http://10.0.2.2:3001",
// });

// export const marketPlaceApiClient = axios.create({
//   baseURL,
// });

// addTokenToRequest(marketPlaceApiClient);

// marketPlaceApiClient.interceptors.response.use(
//   (config) => config,
//   (error) => {
//     if (error.response && error.response.data) {
//       return Promise.reject(new AppError(error.response.data.message));
//     } else {
//       return Promise.reject(new AppError("Falha na requisição!"));
//     }
//   }
// );
