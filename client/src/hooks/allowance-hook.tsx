import { useAppSelector } from "../utils/custom-hook";

export const useAllowance = () => {
  return { ...useAppSelector((state) => state.allowance) };
};
