import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types";
import { Home } from "../screens/Home/home.screen";
import { Brands } from "../screens/Brands/brands.screen";
import { ThemeChange } from "../screens/ThemeChange/themechange.screen";
import { Items } from "../screens/Items/items.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Shop = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Theme" component={ThemeChange} />
      <Stack.Screen name="Brands" component={Brands} />
      <Stack.Screen name="Items" component={Items} />
    </Stack.Navigator>
  );
};
