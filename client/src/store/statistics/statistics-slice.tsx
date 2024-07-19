import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { StatisticsState } from "../../typo/statistics/state";
import {
  PaymentStatisticeResponse,
  StatisticsResponse,
} from "../../typo/statistics/response";
const initialState: StatisticsState = {
  loading: false,
  task_error: undefined,
  task_finished: true,
  payment_stat: [],
  loadding_payment_stat: false,
  stat: {
    total_employees: 0,
    total_positions: 0,
    curr_month_tax: 0,
    curr_month_allowances: 0,
    curr_month_deductions: 0,
    curr_month_overtimes: 0,
    curr_month_payment_amount: 0,
    avg_basic_salary: 0,
    curr_month_allowance: [],
    curr_month_deduction: [],
    curr_month_overtime: [],
  },
};

const StatisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    getStatRequest: (state) => {
      state.task_error = undefined;
      state.task_finished = false;
      state.loading = true;
    },

    getStatDone: (state, action: PayloadAction<StatisticsResponse>) => {
      state.stat = action.payload;
      state.task_finished = true;
      state.loading = false;
    },
    getPaymentStatRequest: (state) => {
      state.loadding_payment_stat = true;
    },
    getPaymentStatDone: (
      state,
      action: PayloadAction<PaymentStatisticeResponse[]>
    ) => {
      state.loadding_payment_stat = false;
      state.payment_stat = action.payload;
    },
    raiseError: (state, action: PayloadAction<string>): void => {
      state.task_error = action.payload;
      state.task_finished = true;
    },
  },
});

export const {
  getStatDone,
  getStatRequest,
  raiseError,
  getPaymentStatDone,
  getPaymentStatRequest,
} = StatisticsSlice.actions;
export default StatisticsSlice.reducer;
