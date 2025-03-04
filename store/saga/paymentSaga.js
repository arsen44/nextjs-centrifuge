import {call, put, take} from 'redux-saga/effects';
import {
  FETCH_PAYMENT_CARD,
  fetchPaymentCardSuccess,
  fetchCardFailError,
} from '../actions/payment';
import {userFetchPaymentCard} from '../../services/api';

function* getPaymentCardFetch() {
  try {
    const card = yield call(userFetchPaymentCard);
    yield put(fetchPaymentCardSuccess(card));
  } catch (error) {
    yield put(fetchCardFailError(error));
  }
}

export function* Payment() {
  while (true) {
    yield take(FETCH_PAYMENT_CARD);
    yield call(getPaymentCardFetch);
  }
}