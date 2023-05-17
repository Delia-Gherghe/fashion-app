import { ThemeColors, blueColors, greenColors, purpleColors } from "./colors";

export type AppTheme = {
  colors: ThemeColors;
};

export const blueTheme = {
  colors: { ...blueColors },
};

export const greenTheme = {
  colors: { ...greenColors },
};

export const purpleTheme = {
  colors: { ...purpleColors },
};
