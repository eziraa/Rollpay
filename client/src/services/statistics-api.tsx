import { AxiosError } from "axios";
import api from "../config/api";
const getStatistics = async () => {
  const employees = await api
    .get("/stat/get")
    .then((res) => {
      return {
        results: res.data,
        code: res.status,
        success: "Success returned employees",
      };
    })
    .catch((err: AxiosError) => {
      const { error } = err.response?.data as { error: string };
      return {
        error: error,
        code: err.response?.status,
      } as { error: string; code: number };
    });
  return employees;
};

const StatisticsAPI = {
  getStatistics,
};
export default StatisticsAPI;
