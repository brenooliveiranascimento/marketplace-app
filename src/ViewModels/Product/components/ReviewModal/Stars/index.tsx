import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

interface StarsProps {
  rating: number;
  handleRatingChange: (rating: number) => void;
}

export const Stars = ({ rating, handleRatingChange }: StarsProps) => {
  return Array.from({ length: 5 }, (_, index) => {
    const starNumber = index + 1;
    const isSelected = starNumber <= rating;

    return (
      <TouchableOpacity
        key={starNumber}
        onPress={() => handleRatingChange(starNumber)}
        className="mr-1"
      >
        <Ionicons
          name={isSelected ? "star" : "star-outline"}
          size={32}
          color={isSelected ? colors["purple-base"] : colors.gray["300"]}
        />
      </TouchableOpacity>
    );
  });
};
