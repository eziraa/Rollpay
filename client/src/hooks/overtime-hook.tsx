import { useAppSelector } from "../utils/custom-hook";

export const useOvertime = () => {
  return { ...useAppSelector((state) => state.overtime) };
};
