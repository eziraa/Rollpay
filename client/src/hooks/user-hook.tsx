import { useAppSelector } from "../utils/custom-hook";

export const useUser = () => {
  return useAppSelector((state) => state.user);
};
