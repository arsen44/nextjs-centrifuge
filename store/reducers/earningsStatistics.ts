import {
  FETCH_EARNINGS_STATISTICS,
  FETCH_EARNINGS_STATISTICS_SUCCESS,
  FETCH_EARNINGS_STATISTICS_FAILURE,
  EarningsStatisticsActions,
} from "../actions/earningsStatistics";

// Типизация возвращаемого значения API
interface WeeklyDetail {
  week: string; // ISO дата в формате ГГГГ-ММ-ДД
  orders_count: number;
  total_amount: number;
}

interface MonthlyDetail {
  month: string; // ISO дата в формате ГГГГ-ММ-ДД
  orders_count: number;
  total_amount: number;
}

export interface EarningsStatistics {
  total_orders: number;
  total_amount: number;
  weekly_details: WeeklyDetail[];
  monthly_details: MonthlyDetail[];
}

interface EarningsStatisticsState {
  loading: boolean;
  statistics: EarningsStatistics | null; // Changed from array to single object or null; // Замените `any` на конкретный тип данных, если известно.
  error: string | null;
}

const initialState: EarningsStatisticsState = {
  loading: false,
  statistics: null,
  error: null,
};

const earningsStatisticsReducer = (
  state = initialState,
  action: EarningsStatisticsActions
): EarningsStatisticsState => {
  switch (action.type) {
    case FETCH_EARNINGS_STATISTICS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EARNINGS_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.payload.statistics,
      };
    case FETCH_EARNINGS_STATISTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default earningsStatisticsReducer;
