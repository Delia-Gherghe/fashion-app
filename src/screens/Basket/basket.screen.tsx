import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Item, RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useSelector, useDispatch } from "react-redux";
import {
  clearBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../../redux/basket.slice";
import { useMemo, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type BasketProps = NativeStackScreenProps<RootStackParamList, "Basket">;

type Grouped = { [key: number]: Item[] };

export const Basket = ({ navigation }: BasketProps) => {
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState<Grouped>([]);

  useMemo(() => {
    const groupedItems = items.reduce((results: Grouped, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  const {
    theme: { colors },
  } = useThemeConsumer();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, backgroundColor: "#f3f4f6" }}>
        <View
          style={{
            padding: 5,
            backgroundColor: "white",
            borderBottomColor: colors.light,
            borderBottomWidth: 0.6,
            marginBottom: 20,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}
            >
              Basket
            </Text>
            {items.length > 0 && (
              <Text
                style={{
                  textAlign: "center",
                  color: "gray",
                  fontWeight: "400",
                  fontSize: 16,
                }}
              >
                {items[0].brand.name}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              borderRadius: 100,
              position: "absolute",
              top: 3,
              right: 3,
            }}
          >
            <Ionicons name={"close-circle"} color={colors.medium} size={50} />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={{ borderTopColor: colors.light, borderTopWidth: 0.6 }}
        >
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "white",
                paddingVertical: 20,
                paddingHorizontal: 10,
                borderBottomColor: colors.light,
                borderBottomWidth: 0.6,
              }}
            >
              <Text style={{ color: colors.dark }}>{items.length} x</Text>
              <Image
                source={{ uri: items[0]?.imageUrl }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  marginHorizontal: 5,
                }}
              />
              <Text style={{ flex: 1 }}>{items[0]?.name}</Text>

              <Text
                style={{
                  color: "#4b5563",
                  marginHorizontal: 6,
                  fontWeight: "bold",
                }}
              >
                € {items[0]?.price}
              </Text>

              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket(items[0]))}
              >
                <Text style={{ color: colors.dark, fontWeight: "600" }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {items.length > 0 && (
          <View
            style={{
              padding: 20,
              backgroundColor: "white",
              borderTopColor: colors.light,
              borderTopWidth: 0.6,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ color: "#9ca3af", fontWeight: "500" }}>
                Subtotal
              </Text>
              <Text style={{ color: "#9ca3af", fontWeight: "500" }}>
                € {(Math.round(basketTotal * 100) / 100).toFixed(2)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={{ color: "#9ca3af", fontWeight: "500" }}>
                Delivery Fee
              </Text>
              <Text style={{ color: "#9ca3af", fontWeight: "500" }}>
                € 10.99
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 15,
              }}
            >
              <Text style={{ fontWeight: "800" }}>Order Total</Text>
              <Text style={{ fontWeight: "800" }}>
                € {(Math.round(basketTotal * 100) / 100 + 10.99).toFixed(2)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: colors.medium,
                padding: 10,
                marginTop: 15,
              }}
              onPress={() => {
                dispatch(clearBasket());
                navigation.navigate("Order");
              }}
            >
              <Text
                style={{
                  color: colors.textMedium,
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Place Order
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
