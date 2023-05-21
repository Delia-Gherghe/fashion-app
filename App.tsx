import { Navigator } from "./src/navigation/navigator";
import { ThemeProvider } from "./src/utils/theme/theme.provider";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </ThemeProvider>
  );
}
