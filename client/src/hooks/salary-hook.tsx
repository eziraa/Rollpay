import { useAppSelector } from "../utils/custom-hook";

export const useSalary = () => useAppSelector((state) => state.salary);
