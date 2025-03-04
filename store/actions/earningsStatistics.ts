export const FETCH_EARNINGS_STATISTICS = "FETCH_EARNINGS_STATISTICS";
export const FETCH_EARNINGS_STATISTICS_SUCCESS = "FETCH_EARNINGS_STATISTICS_SUCCESS";
export const FETCH_EARNINGS_STATISTICS_FAILURE = "FETCH_EARNINGS_STATISTICS_FAILURE";

interface FetchEarningsStatisticsAction {
  type: typeof FETCH_EARNINGS_STATISTICS;
}

interface FetchEarningsStatisticsSuccessAction {
  type: typeof FETCH_EARNINGS_STATISTICS_SUCCESS;
  payload: {
    statistics: any; // Замените `any` на конкретный тип данных, если известно.
  };
}

interface FetchEarningsStatisticsFailureAction {
  type: typeof FETCH_EARNINGS_STATISTICS_FAILURE;
  payload: {
    error: string;
  };
}

export type EarningsStatisticsActions =
  | FetchEarningsStatisticsAction
  | FetchEarningsStatisticsSuccessAction
  | FetchEarningsStatisticsFailureAction;

export const fetchEarningsStatistics = (): FetchEarningsStatisticsAction => ({
  type: FETCH_EARNINGS_STATISTICS,
});

export const fetchEarningsStatisticsSuccess = (statistics: any): FetchEarningsStatisticsSuccessAction => ({
  type: FETCH_EARNINGS_STATISTICS_SUCCESS,
  payload: { statistics },
});

export const fetchEarningsStatisticsFailure = (error: string): FetchEarningsStatisticsFailureAction => ({
  type: FETCH_EARNINGS_STATISTICS_FAILURE,
  payload: { error },
});
