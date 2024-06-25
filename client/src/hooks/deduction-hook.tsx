import { useAppSelector } from "../utils/custom-hook";

export const useDeduction = () => {
  return { ...useAppSelector((state) => state.deduction) };
};
