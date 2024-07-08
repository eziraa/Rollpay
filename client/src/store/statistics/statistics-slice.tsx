import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatisticsState } from "../../typo/statistics/state";
import { StatisticsResponse } from "../../typo/statistics/response";
const initialState: StatisticsState = {
  task_error: undefined,
  task_finished: true,
  stat: {
    total_employees: 39,
    curr_month_tax: 360233.0,
    curr_month_allowances: 36380.0,
    curr_month_deductions: 23460.0,
    curr_month_payment_amount: 812687.0,
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
    },
    raiseError: (state, action: PayloadAction<string>): void => {
      state.task_error = action.payload;
    },
  },
});

export const { getStatDone, getStatRequest } = StatisticsSlice.actions;
export default StatisticsSlice.reducer;