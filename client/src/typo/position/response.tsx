import { BaseResponse } from "../utils/response";

export interface Position {
  id: string;
  position_name: string;
  basic_salary: number;
}

export interface AddPositionResponse extends BaseResponse {
  position: Position;
}
