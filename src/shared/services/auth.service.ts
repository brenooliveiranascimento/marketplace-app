import axios from "axios";
import { User } from "../../store/userStore";
import { baseURL, marketPlaceApiClient } from "../api/market-place";
import {
  UpdateProfileResponse,
  UploadAvatarResponse,
} from "../interfaces/https/profile";

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
    const response = await marketPlaceApiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    if (response.data.token) {
      marketPlaceApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await marketPlaceApiClient.post<AuthResponse>(
      "/auth/register",
      userData
    );

    if (response.data.token) {
      marketPlaceApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  }

  async uploadAvatar(imageUri: string): Promise<UploadAvatarResponse> {
    const formData = new FormData();
    formData.append("avatar", {
      uri: imageUri,
      type: "image/jpeg",
      name: "avatar.jpg",
    } as any);

    const { data } = await marketPlaceApiClient.post<UploadAvatarResponse>(
      "/user/avatar",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    data.url = `${baseURL}${data.url}`;

    return data;
  }

  async logout(): Promise<void> {
    try {
      await marketPlaceApiClient.post("/auth/logout");
    } catch (error) {
    } finally {
      delete marketPlaceApiClient.defaults.headers.common["Authorization"];
    }
  }

  async refreshToken(): Promise<AuthResponse> {
    const response = await marketPlaceApiClient.post<AuthResponse>(
      "/auth/refresh"
    );

    if (response.data.token) {
      marketPlaceApiClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    }

    return response.data;
  }
}

export const authService = new AuthService();
