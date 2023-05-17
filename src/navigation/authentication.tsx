import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types";
import { Login } from "../screens/Login/login.screen";
import { Register } from "../screens/Register/register.screen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Authentication = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
