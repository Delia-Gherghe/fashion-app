import { NavigationContainer } from "@react-navigation/native";
import { Authentication } from "./authentication";
import { useAuthentication } from "../hooks/useAuthentication";
import { Shop } from "./shop";
import { useThemeConsumer } from "../utils/theme/theme.consumer";

export const Navigator = () => {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      {user ? <Shop /> : <Authentication />}
    </NavigationContainer>
  );
};
