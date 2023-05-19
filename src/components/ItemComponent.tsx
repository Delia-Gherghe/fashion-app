import { View, Text, TouchableOpacity, Image } from "react-native";
import { Item } from "../utils/types";
import { useThemeConsumer } from "../utils/theme/theme.consumer";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";

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
            <TouchableOpacity>
              <Entypo
                name={"circle-with-minus"}
                color={colors.medium}
                size={40}
              />
            </TouchableOpacity>
            <Text style={{ marginHorizontal: 5 }}>0</Text>
            <TouchableOpacity>
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
