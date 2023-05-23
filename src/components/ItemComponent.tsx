import {
  View,
  Text,
  TouchableOpacity,
  Image,
  useAnimatedValue,
  Animated,
} from "react-native";
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
import { useEffect } from "react";

export const ItemComponent = ({
  item,
  index,
}: {
  item: Item;
  index: number;
}) => {
  const {
    theme: { colors },
  } = useThemeConsumer();

  const changeOpacity = useAnimatedValue(0);

  const handleOpacityChange = () => {
    Animated.timing(changeOpacity, {
      toValue: 1,
      useNativeDriver: true,
      delay: 200 * index,
      duration: 1000,
    }).start();
  };

  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) =>
    selectBasketItemsWithId(state, item.id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket(item));
  };

  const removeItemFromBasket = () => {
    if (items.length <= 0) return;
    dispatch(removeFromBasket(item));
  };

  useEffect(() => {
    handleOpacityChange();
  }, []);

  return (
    <Animated.View style={{ opacity: changeOpacity }}>
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
            <Text style={{ marginBottom: 1, fontSize: 20 }}>{item.name}</Text>
            <Text style={{ color: "gray", fontWeight: "400" }}>
              {item.description}
            </Text>
            <Text style={{ color: "gray", fontWeight: "bold", marginTop: 5 }}>
              € {item.price}
            </Text>
          </View>
          <View>
            <Image
              source={{ uri: item.imageUrl }}
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
    </Animated.View>
  );
};
