import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Brand, RootStackParamList } from "../../utils/types";
import { useThemeConsumer } from "../../utils/theme/theme.consumer";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearBasket, selectBasketItems } from "../../redux/basket.slice";

type BrandsProps = NativeStackScreenProps<RootStackParamList, "Brands">;

export const Brands = ({ navigation }: BrandsProps) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [error, setError] = useState("");

  const getBrands = async () => {
    try {
      const response = await fetch("http://192.168.100.14:8080/brands");
      const json = await response.json();
      setBrands(json);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          justifyContent: "space-between",
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
        <Text
          style={{ fontSize: 30, fontFamily: "Roboto", marginRight: "36%" }}
        >
          Brands
        </Text>
      </View>
      {error && (
        <View style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ color: colors.dark, fontSize: 16 }}>
            There was an error loading the brands!
          </Text>
          <Text style={{ color: colors.dark, fontSize: 16 }}>
            We are sorry for the inconvenience!
          </Text>
        </View>
      )}
      <FlatList
        data={brands}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              if (items.length > 0 && items[0]?.brand.id !== item.id) {
                dispatch(clearBasket());
              }
              navigation.navigate("Items", { brandId: item.id });
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 15,
                alignItems: "center",
                borderBottomColor: colors.light,
                borderBottomWidth: 0.6,
              }}
            >
              <Text style={{ fontSize: 21 }}>{item.name}</Text>
              <Image
                source={{ uri: item.logoUrl }}
                style={{ height: 80, width: 141 }}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
