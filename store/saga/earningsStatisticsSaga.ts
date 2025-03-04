import { call, put, take } from "redux-saga/effects";
import {
  FETCH_EARNINGS_STATISTICS,
  fetchEarningsStatisticsSuccess,
  fetchEarningsStatisticsFailure,
} from "../actions/earningsStatistics";
import { fetchEarningsStatistics } from "../../services/api";
import { EarningsStatistics } from "../reducers/earningsStatistics";

// Типизация ошибки
interface SagaError extends Error {
  response?: any; // Добавлено для поддержки возможных ошибок API
}

function* getEarningsStatistics() {
  try {
    const statistics: EarningsStatistics = yield call(fetchEarningsStatistics);
    yield put(fetchEarningsStatisticsSuccess(statistics));
  } catch (error) {
    // Типизация ошибки
    const typedError = error as SagaError;
    yield put(fetchEarningsStatisticsFailure(typedError.message || "Unknown error"));
  }
}

export function* Statistics() {
  while (true) {
    yield take(FETCH_EARNINGS_STATISTICS);
    yield call(getEarningsStatistics);
  }
}
