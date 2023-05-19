import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Pressable, FlatList } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Brand, Item, RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ItemComponent } from "../../components/ItemComponent";

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
        <Pressable style={{ flexDirection: "row" }}>
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

      <View style={{ borderBottomColor: colors.light, borderBottomWidth: 0.6 }}>
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
        renderItem={({ item }) => (
          <ItemComponent
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            brand={item.brand}
          />
        )}
      />
    </SafeAreaView>
  );
};
