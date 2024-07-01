import { useAppSelector } from "../utils/custom-hook";

export const usePosition = () => useAppSelector((state) => state.position);
