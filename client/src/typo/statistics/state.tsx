import { PaymentStatisticeResponse, StatisticsResponse } from "./response";

export interface StatisticsState {
  stat: StatisticsResponse;
  payment_stat: PaymentStatisticeResponse[];
  task_finished: boolean;
  task_error: string | undefined;
  loading: boolean;
}
