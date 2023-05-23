import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Brand, Item, RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ItemComponent } from "../../components/ItemComponent";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../../redux/basket.slice";

type ItemsProps = NativeStackScreenProps<RootStackParamList, "Items">;

export const Items = ({ route, navigation }: ItemsProps) => {
  const { brandId } = route.params;

  const {
    theme: { colors },
  } = useThemeConsumer();

  const [brand, setBrand] = useState<Brand>();
  const [items, setItems] = useState<Item[]>([]);
  const [errorBrand, setErrorBrand] = useState("");
  const [errorItems, setErrorItems] = useState("");

  const totalItems = useSelector(selectBasketItems);
  const totalPrice = useSelector(selectBasketTotal);

  const getBrand = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.14:8080/brands/${brandId}`
      );
      const json = await response.json();
      setBrand(json);
      setErrorBrand("");
    } catch (error: any) {
      setErrorBrand(error.message);
      console.log(error);
    }
  };

  const getItems = async () => {
    try {
      const response = await fetch(
        `http://192.168.100.14:8080/items/brand/${brandId}`
      );
      const json = await response.json();
      setItems(json);
      setErrorItems("");
    } catch (error: any) {
      setErrorItems(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getBrand();
    getItems();
  }, []);

  return (
    <>
      {totalItems.length > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 10,
            width: "100%",
            zIndex: 50,
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Basket", { brandName: items[0].brand.name })
            }
            style={{
              backgroundColor: colors.medium,
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.textDark,
                fontWeight: "bold",
                fontSize: 18,
                backgroundColor: colors.dark,
                paddingVertical: 1,
                paddingHorizontal: 5,
                borderRadius: 4,
              }}
            >
              {totalItems.length}
            </Text>
            <Text
              style={{
                flex: 1,
                color: colors.textMedium,
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              View Basket
            </Text>
            <Text
              style={{
                color: colors.textMedium,
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              € {(Math.round(totalPrice * 100) / 100).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}

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
            <Text style={{ fontSize: 30 }}>{brand?.name}</Text>
          </View>
          <View style={{ width: "15%" }}></View>
        </View>

        <View
          style={{
            alignItems: "center",
            paddingVertical: 5,
            borderBottomColor: colors.medium,
            borderBottomWidth: 3,
            backgroundColor: colors.light,
          }}
        >
          <Pressable
            style={{ flexDirection: "row" }}
            onPress={() =>
              navigation.navigate("Reviews", {
                brandId: brandId,
                brandName: brand?.name,
              })
            }
          >
            <Ionicons name={"star"} size={25} color={colors.dark} />
            <Text
              style={{ fontSize: 18, marginLeft: 5, color: colors.textLight }}
            >
              Reviews
            </Text>
          </Pressable>
        </View>

        {errorItems && (
          <View style={{ padding: 10, alignItems: "center" }}>
            <Text style={{ color: colors.dark, fontSize: 16 }}>
              There was an error loading the items!
            </Text>
            <Text style={{ color: colors.dark, fontSize: 16 }}>
              We are sorry for the inconvenience!
            </Text>
          </View>
        )}

        <View
          style={{ borderBottomColor: colors.light, borderBottomWidth: 0.6 }}
        >
          <Text
            style={{
              paddingHorizontal: 4,
              paddingTop: 13,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            Items
          </Text>
        </View>

        {!errorItems && items.length == 0 && (
          <View style={{ padding: 4 }}>
            <Text style={{ color: colors.dark, fontSize: 16 }}>
              No items available
            </Text>
          </View>
        )}

        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <ItemComponent item={item} index={index} />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </SafeAreaView>
    </>
  );
};
