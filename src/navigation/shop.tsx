import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types";
import { Home } from "../screens/Home/home.screen";
import { Brands } from "../screens/Brands/brands.screen";
import { ThemeChange } from "../screens/ThemeChange/themechange.screen";
import { Items } from "../screens/Items/items.screen";
import { Basket } from "../screens/Basket/basket.screen";
import { Order } from "../screens/Order/order.screen";
import { Reviews } from "../screens/Reviews/reviews.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Shop = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Theme" component={ThemeChange} />
      <Stack.Screen name="Brands" component={Brands} />
      <Stack.Screen name="Items" component={Items} />
      <Stack.Screen
        name="Basket"
        component={Basket}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ presentation: "fullScreenModal" }}
      />
      <Stack.Screen name="Reviews" component={Reviews} />
    </Stack.Navigator>
  );
};
