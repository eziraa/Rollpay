import { hexToRgb } from "./hex-to-rgba";
export const addOpacityToColor = (opacity: number, color: string) => {
  const rgb = hexToRgb(color);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : color;
};
