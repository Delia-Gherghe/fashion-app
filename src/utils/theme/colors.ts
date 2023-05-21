type ColorsKeys =
  | "dark"
  | "medium"
  | "light"
  | "textDark"
  | "textMedium"
  | "textLight";

export type ThemeColors = { [key in ColorsKeys]: string };

export const blueColors: ThemeColors = {
  dark: "#0b5394",
  medium: "#3d85c6",
  light: "#9fc5e8",
  textDark: "#ffffff",
  textMedium: "#eeeeee",
  textLight: "#000000",
};

export const greenColors: ThemeColors = {
  dark: "#006b3c",
  medium: "#33b57c",
  light: "#83d29f",
  textDark: "#ffffff",
  textMedium: "#ffffff",
  textLight: "#000000",
};

export const purpleColors: ThemeColors = {
  dark: "#674ea7",
  medium: "#8e7cc3",
  light: "#d9d2e9",
  textDark: "#ffffff",
  textMedium: "#ffffff",
  textLight: "#000000",
};
