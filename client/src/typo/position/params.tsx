export interface AddPositionParams {
  position_name: string;
  basic_salary: string;
}
export interface EditPositionParams extends AddPositionParams {
  id: string;
}
