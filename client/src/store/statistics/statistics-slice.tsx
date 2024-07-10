import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatisticsState } from "../../typo/statistics/state";
import { StatisticsResponse } from "../../typo/statistics/response";
const initialState: StatisticsState = {
  task_error: undefined,
  task_finished: true,
  stat: {
    total_employees: 0,
    total_positions: 0,
    curr_month_tax: 0,
    curr_month_allowances: 0,
    curr_month_deductions: 0,
    curr_month_payment_amount: 0,
    avg_basic_salary: 0,
    curr_month_allowance: [],
    curr_month_deduction: [],
  },
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    getStatRequest: (state) => {
      state.task_error = undefined;
      state.task_finished = false;
    },

    getStatDone: (state, action: PayloadAction<StatisticsResponse>) => {
      state.stat = action.payload;
      state.task_finished = true;
    },
    raiseError: (state, action: PayloadAction<string>): void => {
      state.task_error = action.payload;
      state.task_finished = true;
    },
  },
});

export const { getStatDone, getStatRequest } = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
