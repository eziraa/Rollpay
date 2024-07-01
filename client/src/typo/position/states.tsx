import { Pagination } from "../../services/employee-api";
import { BaseState } from "../utils/state";
import { Position } from "./response";

export interface PositionState extends BaseState {
  curr_position: Position | undefined;
  positions: Position[];
  task_error: string | undefined;
  query_set: Position[];
  pagination: Pagination | undefined;
}
