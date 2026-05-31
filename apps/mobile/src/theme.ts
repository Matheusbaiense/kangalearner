export const colors = {
  navy: "#071A2C",
  navy2: "#102C42",
  teal: "#2B8A78",
  green: "#52B788",
  blue: "#1E7AF0",
  paper: "#F5F8FB",
  card: "#FFFFFF",
  ink: "#0B1828",
  muted: "#64758A",
  border: "#D9E3EA",
  danger: "#D64545",
  warning: "#C77700",
  success: "#238857"
};

export const darkColors = {
  ...colors,
  paper: "#071A2C",
  card: "#102C42",
  ink: "#F7FBFF",
  muted: "#B8C7D6",
  border: "#29465D"
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  pill: 999
};

export type ThemeColors = typeof colors;

