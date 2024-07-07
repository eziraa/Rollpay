import { useAppSelector } from "../utils/custom-hook";

export const useStatistics = () => useAppSelector((state) => state.statistics);
