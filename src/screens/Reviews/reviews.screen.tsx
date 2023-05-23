import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  LogBox,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Review, RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { db, auth } from "../../utils/firebase";
import {
  collection,
  query,
  where,
  addDoc,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { ReviewComponent } from "../../components/ReviewComponent";

type ReviewsProps = NativeStackScreenProps<RootStackParamList, "Reviews">;

export const Reviews = ({ route, navigation }: ReviewsProps) => {
  const { brandId, brandName } = route.params;
  const [input, setInput] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isFirstTime, setIsFirstTime] = useState(true);

  const {
    theme: { colors },
  } = useThemeConsumer();

  LogBox.ignoreAllLogs();

  const addReview = async () => {
    await addDoc(collection(db, "reviews"), {
      userId: auth.currentUser?.uid,
      username: auth.currentUser?.email,
      brandId: brandId,
      content: input,
      createdAt: Timestamp.fromDate(new Date()),
    });

    setInput("");
    setIsFirstTime(false);
  };

  useEffect(() => {
    const q = query(collection(db, "reviews"), where("brandId", "==", brandId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let reviews: Review[] = [];
      snapshot.forEach((review) => {
        const data = review.data();
        reviews.push({
          id: review.id,
          userId: data.userId,
          username: data.username,
          brandId: data.brandId,
          content: data.content,
          createdAt: data.createdAt.toDate(),
        });
      });
      reviews.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      setReviews(reviews);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          borderBottomColor: colors.medium,
          borderBottomWidth: 3,
        }}
      >
        <View style={{ width: "15%" }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name={"arrow-back-outline"}
            size={35}
            color={colors.dark}
          />
        </View>

        <View
          style={{
            width: "70%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
          >
            Reviews
          </Text>
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              fontWeight: "400",
              fontSize: 16,
            }}
          >
            {brandName}
          </Text>
        </View>
        <View style={{ width: "15%" }}></View>
      </View>

      <ScrollView style={{ flex: 1, paddingBottom: 4 }}>
        {reviews.map((review, index) => (
          <ReviewComponent
            review={review}
            index={index}
            isFirst={isFirstTime}
            setIsFirst={setIsFirstTime}
          />
        ))}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopColor: colors.light,
          borderTopWidth: 1,
          borderBottomColor: colors.light,
          borderBottomWidth: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          backgroundColor: "#f3f6f4",
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{
            height: 20,
            fontSize: 16,
            color: "black",
            flex: 1,
            paddingRight: 10,
          }}
          placeholder="Send Review..."
        />
        <Button title="Send" color={colors.dark} onPress={addReview} />
      </View>
    </SafeAreaView>
  );
};
