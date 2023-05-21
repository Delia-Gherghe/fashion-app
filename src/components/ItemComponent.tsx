import { View, Text, TouchableOpacity, Image } from "react-native";
import { Item } from "../utils/types";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../redux/basket.slice";
import { RootState } from "../redux/store";

export const ItemComponent = ({
  id,
  name,
  description,
  price,
  imageUrl,
  brand,
}: Item) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) =>
    selectBasketItemsWithId(state, id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, imageUrl, brand }));
  };

  const removeItemFromBasket = () => {
    if (items.length <= 0) return;
    dispatch(
      removeFromBasket({ id, name, description, price, imageUrl, brand })
    );
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        style={[
          {
            backgroundColor: "white",
            padding: 5,
          },
          !isPressed && {
            borderBottomColor: colors.light,
            borderBottomWidth: 0.6,
          },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, paddingRight: 2 }}>
            <Text style={{ marginBottom: 1, fontSize: 20 }}>{name}</Text>
            <Text style={{ color: "gray", fontWeight: "400" }}>
              {description}
            </Text>
            <Text style={{ color: "gray", fontWeight: "bold", marginTop: 5 }}>
              € {price}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: imageUrl }}
              style={{ height: 135, width: 135 }}
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View
          style={{
            backgroundColor: "white",
            padding: 5,
            borderBottomColor: colors.light,
            borderBottomWidth: 0.6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingBottom: 3,
            }}
          >
            <TouchableOpacity
              disabled={items.length <= 0}
              onPress={removeItemFromBasket}
            >
              <Entypo
                name={"circle-with-minus"}
                color={items.length > 0 ? colors.medium : "gray"}
                size={40}
              />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 5 }}>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <Entypo
                name={"circle-with-plus"}
                color={colors.medium}
                size={40}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
