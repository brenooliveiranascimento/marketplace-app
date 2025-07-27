import { marketPlaceApiClient } from "../api/market-place";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "../interfaces/https/profile";

class ProfileService {
  async updateProfile(
    data: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    const response = await marketPlaceApiClient.put<UpdateProfileResponse>(
      "/user",
      data
    );
    return response.data;
  }
}

export const profileService = new ProfileService();
