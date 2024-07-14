import { PaymentStatisticeResponse, StatisticsResponse } from "./response";

export interface StatisticsState {
  stat: StatisticsResponse;
  payment_stat: PaymentStatisticeResponse | undefined;
  task_finished: boolean;
  task_error: string | undefined;
  loading: boolean;
}
