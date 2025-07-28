import React from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface CreditCardProps {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
  cardType: string;
  isFlipped?: boolean;
  focused?: "number" | "name" | "expiry" | "cvv";
}

const mapCardType = (type: string): string => {
  const typeMap: { [key: string]: string } = {
    "american-express": "amex",
    "diners-club": "diners",
    "master-card": "mastercard",
    visa: "visa",
    mastercard: "mastercard",
    discover: "discover",
    jcb: "jcb",
    unionpay: "unionpay",
    unknown: "unknown",
  };

  return typeMap[type] || type;
};

const getCardGradient = (cardType: string): readonly [string, string] => {
  const mappedType = mapCardType(cardType);

  const gradients = {
    visa: ["#1A1F71", "#0D47A1"] as const,
    mastercard: ["#EB001B", "#F79E1B"] as const,
    amex: ["#006FCF", "#00C3F7"] as const,
    discover: ["#FF6000", "#FF8F00"] as const,
    jcb: ["#006FCF", "#00A0E6"] as const,
    diners: ["#0079BE", "#005A8C"] as const,
    unionpay: ["#E21836", "#C41E3A"] as const,
    default: ["#374151", "#111827"] as const,
  };

  return gradients[mappedType as keyof typeof gradients] || gradients.default;
};

const getBrandIcon = (cardType: string) => {
  const mappedType = mapCardType(cardType);

  const icons = {
    visa: "VISA",
    mastercard: "MC",
    amex: "AMEX",
    discover: "DISC",
    jcb: "JCB",
    diners: "DINERS",
    unionpay: "UP",
    default: "",
  };

  return icons[mappedType as keyof typeof icons] || icons.default;
};

export const CreditCardVisual: React.FC<CreditCardProps> = ({
  cardNumber,
  cardholderName,
  expiryDate,
  cvv,
  cardType,
  isFlipped = false,
  focused,
}) => {
  const flipAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 1 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isFlipped]);

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  const formatCardNumber = (number: string) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.length === 0) return "•••• •••• •••• ••••";

    if (cleaned.length <= 4) {
      return cleaned.padEnd(4, "•") + " •••• •••• ••••";
    }

    if (cleaned.length <= 8) {
      const first4 = cleaned.slice(0, 4);
      const remaining = cleaned.slice(4).padEnd(4, "•");
      return `${first4} ${remaining} •••• ••••`;
    }

    if (cleaned.length <= 12) {
      const first4 = cleaned.slice(0, 4);
      const second4 = cleaned.slice(4, 8);
      const remaining = cleaned.slice(8).padEnd(4, "•");
      return `${first4} ${second4} ${remaining} ••••`;
    }

    const first4 = cleaned.slice(0, 4);
    const last4 = cleaned.slice(-4);

    if (cleaned.length === 16) {
      return `${first4} •••• •••• ${last4}`;
    }

    const middle = "••••";
    return `${first4} ${middle} ${last4}`;
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const mappedType = mapCardType(cardType);

  return (
    <View className="h-48 mx-4 my-5">
      <Animated.View
        style={[
          frontAnimatedStyle,
          {
            position: "absolute",
            width: "100%",
            height: 192,
            backfaceVisibility: "hidden",
          },
        ]}
        className="rounded-2xl"
        pointerEvents="none"
      >
        <LinearGradient
          colors={getCardGradient(cardType)}
          style={{ flex: 1, borderRadius: 16, padding: 20 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <View className="w-10 h-7 bg-yellow-400 rounded-md" />
            <Text className="text-white text-xs font-bold tracking-wider">
              {getBrandIcon(cardType)}
            </Text>
          </View>

          <View
            className={`py-2 px-1 rounded-lg mb-6 ${
              focused === "number" ? "bg-white/20" : ""
            }`}
          >
            <Text className="text-white text-lg font-mono tracking-widest text-center">
              {formatCardNumber(cardNumber)}
            </Text>
          </View>

          <View className="flex-row justify-between items-end">
            <View
              className={`flex-1 py-1 px-1 rounded-lg ${
                focused === "name" ? "bg-white/20" : ""
              }`}
            >
              <Text className="text-gray-300 text-xs mb-1">PORTADOR</Text>
              <Text className="text-white text-sm font-semibold uppercase">
                {cardholderName || "NOME DO TITULAR"}
              </Text>
            </View>

            <View
              className={`ml-4 py-1 px-1 rounded-lg ${
                focused === "expiry" ? "bg-white/20" : ""
              }`}
            >
              <Text className="text-gray-300 text-xs mb-1">VÁLIDO ATÉ</Text>
              <Text className="text-white text-sm font-semibold">
                {expiryDate || "MM/AA"}
              </Text>
            </View>
          </View>

          <Text className="absolute bottom-4 right-5 text-gray-400 text-xs">
            {mappedType.toUpperCase()}
          </Text>
        </LinearGradient>
      </Animated.View>

      <Animated.View
        style={[
          backAnimatedStyle,
          {
            position: "absolute",
            width: "100%",
            height: 192,
            backfaceVisibility: "hidden",
          },
        ]}
        className="rounded-2xl"
        pointerEvents="none"
      >
        <LinearGradient
          colors={getCardGradient(cardType)}
          style={{ flex: 1, borderRadius: 16 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="h-10 bg-black -mx-5 mt-5" />

          <View className="flex-1 justify-center items-end px-5">
            <View className="w-24">
              <Text className="text-gray-300 text-xs mb-2">CVV</Text>
              <View
                className={`bg-white p-2 rounded h-8 justify-center ${
                  focused === "cvv" ? "bg-blue-100" : ""
                }`}
              >
                <Text className="text-black text-center font-mono">
                  {cvv || "•••"}
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-gray-400 text-xs text-center px-4 pb-4 leading-3">
            Este cartão é propriedade do banco emissor e deve ser devolvido
            quando solicitado.
          </Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
};
