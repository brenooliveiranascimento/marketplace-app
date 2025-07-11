import axios from "axios";
import { User } from "../../store/userStore";
import { apiClient } from "../api/market-place";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/login",
        credentials
      );

      if (response.data.token) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Erro ao fazer login. Verifique suas credenciais."
        );
      }
      throw new Error("Erro de conexão. Tente novamente.");
    }
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        "/auth/register",
        userData
      );

      if (response.data.token) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            "Erro ao criar conta. Tente novamente."
        );
      }
      throw new Error("Erro de conexão. Tente novamente.");
    }
  }

  async uploadAvatar(imageUri: string): Promise<{ avatarUrl: string }> {
    try {
      const formData = new FormData();
      formData.append("avatar", {
        uri: imageUri,
        type: "image/jpeg",
        name: "avatar.jpg",
      } as any);

      const response = await apiClient.post<{ avatarUrl: string }>(
        "/user/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Erro ao fazer upload da imagem."
        );
      }
      throw new Error("Erro de conexão. Tente novamente.");
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
    } finally {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>("/auth/refresh");

      if (response.data.token) {
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data;
    } catch (error) {
      throw new Error("Sessão expirada. Faça login novamente.");
    }
  }
}

export const authService = new AuthService();
