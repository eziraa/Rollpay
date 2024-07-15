export interface BaseState {
  task_finished: boolean;
  task_error: string | undefined;
  searching: boolean;
  editing: boolean;
  deleting: boolean;
  loading: boolean;
  adding: boolean;
}
