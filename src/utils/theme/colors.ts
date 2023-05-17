type ColorsKeys =
  | "dark"
  | "medium"
  | "light"
  | "textDark"
  | "textMedium"
  | "textLight";

export type ThemeColors = { [key in ColorsKeys]: string };

export const blueColors: ThemeColors = {
  dark: "#272ed2",
  medium: "#4892d5",
  light: "#82b9eb",
  textDark: "#ffffff",
  textMedium: "#eeeeee",
  textLight: "#000000",
};

export const greenColors: ThemeColors = {
  dark: "#006b3c",
  medium: "#33b57c",
  light: "#4aeaa4",
  textDark: "#ffffff",
  textMedium: "#444444",
  textLight: "#000000",
};

export const purpleColors: ThemeColors = {
  dark: "#674ea7",
  medium: "#8e7cc3",
  light: "#b4a7d6",
  textDark: "#ffffff",
  textMedium: "#eeeeee",
  textLight: "#000000",
};
