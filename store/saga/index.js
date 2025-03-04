import { all } from "redux-saga/effects";
import { watchAuth } from "./authSaga";
import { Statistics } from "./earningsStatisticsSaga";
import { Payment } from "./paymentSaga";
// Redux Saga: Root Saga
export function* rootSaga() {
  yield all([watchAuth(), Statistics(), Payment()]);
}
