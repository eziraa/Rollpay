import { useAppSelector } from "../utils/custom-hook";

/**
 * Custom hook that returns the employee state from the Redux store.
 * @returns The employee state object.
 */
export const useEmployee = () => {
  return useAppSelector((state) => state.employee);
};
