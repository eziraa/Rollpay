import { useAppSelector } from "../utils/custom-hook";

export const useAsset = () => {
  return { ...useAppSelector((state) => state.asset) };
};
