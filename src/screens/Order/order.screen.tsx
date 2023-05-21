import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useState, useEffect } from "react";

type OrderProps = NativeStackScreenProps<RootStackParamList, "Order">;

export const Order = ({ navigation }: OrderProps) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  const [isProcessed, setIsProcessed] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsProcessed(true);
    }, 4000);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.medium,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isProcessed && (
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/woman-shopping-online.gif")}
            style={{ height: 300, width: 300 }}
          />
          <Text
            style={{
              fontSize: 23,
              color: colors.textMedium,
              marginVertical: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Processing Order...
          </Text>

          <ActivityIndicator size={"large"} color={colors.textMedium} />
        </View>
      )}

      {isProcessed && (
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../../assets/business-task-list.png")}
            style={{ height: 300, width: 300 }}
          />
          <Text
            style={{
              fontSize: 23,
              color: colors.textMedium,
              marginVertical: 20,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            You order has been processed!
          </Text>
          <Text
            style={{
              fontSize: 23,
              color: colors.textMedium,
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Thank you for shopping with us!
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 30,
              backgroundColor: colors.textMedium,
              width: 150,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              height: 40,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ fontSize: 20, color: colors.dark }}>Home</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};
