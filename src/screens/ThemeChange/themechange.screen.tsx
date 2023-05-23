import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  TouchableOpacity,
  View,
  Text,
  useAnimatedValue,
  Animated,
} from "react-native";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import {
  blueColors,
  greenColors,
  purpleColors,
} from "../../utils/theme/colors";
import { themeChangeStyles } from "./themechange.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";

type ThemeProps = NativeStackScreenProps<RootStackParamList, "Theme">;

export const ThemeChange = ({ navigation }: ThemeProps) => {
  const {
    changeTheme,
    theme: { colors },
  } = useThemeConsumer();

  const rotateBlue = useAnimatedValue(0);
  const rotateGreen = useAnimatedValue(0);
  const rotatePurple = useAnimatedValue(0);

  const handleBlueAnimation = () => {
    Animated.timing(rotateBlue, {
      toValue: 1,
      useNativeDriver: true,
      duration: 600,
    }).start(() => {
      rotateBlue.setValue(0);
    });
  };

  const handleGreenAnimation = () => {
    Animated.timing(rotateGreen, {
      toValue: 1,
      useNativeDriver: true,
      delay: 400,
      duration: 600,
    }).start(() => {
      rotateGreen.setValue(0);
    });
  };

  const handlePurpleAnimation = () => {
    Animated.timing(rotatePurple, {
      toValue: 1,
      useNativeDriver: true,
      delay: 1000,
      duration: 600,
    }).start(() => {
      rotatePurple.setValue(0);
    });
  };

  useEffect(() => {
    handleBlueAnimation();
    handleGreenAnimation();
    handlePurpleAnimation();
  }, []);

  const styles = themeChangeStyles();
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 10,
          borderBottomColor: colors.medium,
          borderBottomWidth: 3,
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          name={"arrow-back-outline"}
          size={35}
          color={colors.dark}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: colors.dark, fontSize: 24, fontWeight: "600" }}>
          Pick your favorite color!
        </Text>
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateBlue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
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
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotateGreen.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
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
          </Animated.View>

          <Animated.View
            style={{
              transform: [
                {
                  rotate: rotatePurple.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
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
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
};
