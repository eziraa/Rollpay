export interface AddPositionParams {
  position_name: string;
  basic_salary: number;
}
export interface EditPositionParams extends AddPositionParams {
  id: string;
}
