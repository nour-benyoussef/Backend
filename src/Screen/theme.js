import { Dimensions } from "react-native";
export const { width, height } = Dimensions.get("window");
export const SIZE = 64;
export const ICON_SIZE = SIZE * 0.6;
export const SPACING = 12;
const s = width * 0.68;
export const tutorial2SPec = {
  ITEM_WIDTH: s,
  ITEM_HEIGHT: s * 1.5,
  RADIUS: 19,
  SPACING,
  FULL_SIZE: s + SPACING * 2,
};
