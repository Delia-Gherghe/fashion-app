import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View, Text } from "react-native";
import { auth } from "../../utils/firebase";
import { signOut } from "firebase/auth";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";

type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const Home = ({ navigation }: HomeProps) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 150,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: colors.light,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={() => navigation.navigate("Theme")}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.textLight }}
          >
            Change Theme
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            marginTop: 30,
            borderRadius: 20,
            borderColor: "black",
            borderWidth: 1,
            backgroundColor: colors.medium,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: colors.textMedium,
            }}
          >
            Shop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: 150,
            marginTop: 30,
            borderRadius: 20,
            backgroundColor: colors.dark,
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
          onPress={() => signOut(auth)}
        >
          <Text
            style={{ fontSize: 14, fontWeight: "400", color: colors.textDark }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
