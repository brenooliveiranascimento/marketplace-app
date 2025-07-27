import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";
import Constants from "expo-constants";

const getBaseURL = () => {
  const isProduction = Constants.expoConfig?.extra?.isProduction || false;

  if (isProduction) {
    return process.env.EXPO_PUBLIC_API_URL_PROD;
  } else {
    return Platform.select({
      ios: "http://localhost:3001",
      android: "http://10.0.2.2:3001",
    });
  }
};

export const baseURL = getBaseURL();

class ApiClient {
  private instance: AxiosInstance;
  private isRefreshing = false;

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
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          error.response?.data?.message === "Token expirado" &&
          !originalRequest._retry &&
          !this.isRefreshing
        ) {
          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const userData = await AsyncStorage.getItem("market-place-auth");

            if (!userData) {
              throw new Error("Usuário não autenticado");
            }

            const {
              state: { refreshToken },
            } = JSON.parse(userData);

            if (!refreshToken) {
              throw new Error("Refresh token não encontrado");
            }

            const response = await this.instance.post("/auth/refresh", {
              refreshToken,
            });

            const { token: newToken, refreshToken: newRefreshToken } =
              response.data;

            const currentUserData = JSON.parse(userData);
            currentUserData.state.token = newToken;
            currentUserData.state.refreshToken = newRefreshToken;

            await AsyncStorage.setItem(
              "market-place-auth",
              JSON.stringify(currentUserData)
            );

            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.instance(originalRequest);
          } catch (refreshError) {
            this.handleUnauthorized();
            return Promise.reject(
              new AppError("Sessão expirada. Faça login novamente.")
            );
          } finally {
            this.isRefreshing = false;
          }
        }

        if (error.response?.status === 401) {
          this.handleUnauthorized();
        }

        if (error.response && error.response.data) {
          return Promise.reject(new AppError(error.response.data.message));
        } else {
          return Promise.reject(new AppError("Falha na requisição!"));
        }
      }
    );
  }

  private async handleUnauthorized() {
    delete this.instance.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("market-place-auth");
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
