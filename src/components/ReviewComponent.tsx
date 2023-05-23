import {
  View,
  Text,
  TouchableOpacity,
  useAnimatedValue,
  Animated,
  Dimensions,
} from "react-native";
import { Review } from "../utils/types";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db, auth } from "../utils/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect } from "react";

export const ReviewComponent = ({
  review,
  index,
  isFirst,
  setIsFirst,
}: {
  review: Review;
  index: number;
  isFirst: boolean;
  setIsFirst: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  let xPosition: Animated.Value;
  let handleAnimation: () => void;
  let interpolatePosition;

  if (index % 2 == 0) {
    xPosition = useAnimatedValue(1);
    handleAnimation = () => {
      Animated.spring(xPosition, {
        toValue: 0,
        useNativeDriver: true,
        delay: index * 200,
      }).start();
    };
    interpolatePosition = xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, Dimensions.get("window").width],
    });
  } else {
    xPosition = useAnimatedValue(0);
    handleAnimation = () => {
      Animated.spring(xPosition, {
        toValue: 1,
        useNativeDriver: true,
        delay: index * 200,
      }).start();
    };
    interpolatePosition = xPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [-Dimensions.get("window").width, 0],
    });
  }

  useEffect(() => {
    handleAnimation();
  }, []);

  return (
    <Animated.View
      style={[
        {
          backgroundColor: colors.light,
          marginHorizontal: 4,
          marginTop: 4,
          borderRadius: 10,
          flexDirection: "row",
          padding: 7,
          justifyContent: "space-between",
        },
        isFirst && { transform: [{ translateX: interpolatePosition }] },
      ]}
    >
      <View style={{ width: "90%" }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {review.content}
        </Text>
        <Text style={{ fontSize: 13, marginTop: 3 }}>by {review.username}</Text>
      </View>

      {review.userId === auth.currentUser?.uid && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <TouchableOpacity>
            <Ionicons
              name={"trash"}
              color={colors.dark}
              size={25}
              onPress={async () => {
                try {
                  await deleteDoc(doc(db, "reviews", review.id));
                  setIsFirst(false);
                } catch (err: any) {
                  console.log(err.message);
                }
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};
