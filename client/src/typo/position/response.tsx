import { BaseResponse } from "../utils/response";

export interface Position {
  id: string;
  position_name: string;
  basic_salary: number;
  start_date: string | undefined;
  end_date: string | undefined;
}

export interface AddPositionResponse extends BaseResponse {
  position: Position;
}
