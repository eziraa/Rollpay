import { StatisticsResponse } from "./response";

export interface StatisticsState {
  stat: StatisticsResponse;
  task_finished: boolean;
  task_error: string | undefined;
}
