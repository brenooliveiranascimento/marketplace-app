import { ProfileView } from "@/ViewModels/Profile/ProfileView";
import { useProfileModel } from "@/ViewModels/Profile/useProfileModel";

export default function Profile() {
  const profileModel = useProfileModel();

  return <ProfileView {...profileModel} />;
}
