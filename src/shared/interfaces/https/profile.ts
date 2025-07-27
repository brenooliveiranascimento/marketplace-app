export interface UpdateProfileRequest {
  name: string;
  email: string;
  phone: string;
  password?: string;
  newPassword?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface UpdateProfileResponse {
  user: User;
}

export interface UploadAvatarResponse {
  message: string;
  filename: string;
  url: string;
}
