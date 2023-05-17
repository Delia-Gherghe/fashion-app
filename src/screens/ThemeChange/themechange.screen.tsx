import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, View, Text } from "react-native";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import {
  blueColors,
  greenColors,
  purpleColors,
} from "../../utils/theme/colors";
import { themeChangeStyles } from "./themechange.styles";

type ThemeProps = NativeStackScreenProps<RootStackParamList, "Theme">;

export const ThemeChange = ({ navigation }: ThemeProps) => {
  const {
    changeTheme,
    theme: { colors },
  } = useThemeConsumer();

  const styles = themeChangeStyles();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.dark, fontSize: 24, fontWeight: "600" }}>
        Pick your favorite color!
      </Text>
      <View style={{ alignItems: "center", marginTop: 20 }}>
        <TouchableOpacity
          style={[{ backgroundColor: blueColors.medium }, styles.button]}
          onPress={() => changeTheme("blue")}
        >
          <Text
            style={[
              {
                color: blueColors.textMedium,
              },
              styles.text,
            ]}
          >
            Blue
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: greenColors.medium,
            },
            styles.button,
          ]}
          onPress={() => changeTheme("green")}
        >
          <Text
            style={[
              {
                color: greenColors.textMedium,
              },
              styles.text,
            ]}
          >
            Green
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            {
              backgroundColor: purpleColors.medium,
            },
            styles.button,
          ]}
          onPress={() => changeTheme("purple")}
        >
          <Text
            style={[
              {
                color: purpleColors.textMedium,
              },
              styles.text,
            ]}
          >
            Purple
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
