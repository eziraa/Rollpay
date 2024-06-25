import { useAppSelector } from "../utils/custom-hook";

export const useEmployee = () => {
  return { ...useAppSelector((state) => state.employee) };
};
