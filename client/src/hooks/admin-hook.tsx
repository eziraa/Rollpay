import { useAppSelector } from "../utils/custom-hook";

export const useAdmin = () => useAppSelector((state) => state.admin);
