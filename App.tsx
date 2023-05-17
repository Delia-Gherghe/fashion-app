import { Navigator } from "./src/navigation/navigator";
import { ThemeProvider } from "./src/utils/theme/theme.provider";

export default function App() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
