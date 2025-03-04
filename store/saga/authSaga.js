import { put, call, takeLatest, all, fork, delay } from "redux-saga/effects";
import axios from "axios";
import authAxios from "../../helpers/utils";
import { restAuth, userIDURL, REFRESH_TOKEN, COMPANY_UPDATE } from "../../helpers/constants";
import {
  authStart,
  authSuccess,
  authFail,
  refreshTokenFailure,
  fetchUserRequest,
  fetchRefreshTokenRequest,
  fetchUserSuccess,
  updateCompanySuccess,
  updateCompanyFailure,
} from "../actions/auth";

// axios.defaults.withCredentials = true; // Включает отправку cookies
// axios.defaults.xsrfCookieName = "csrftoken"; // Имя cookies CSRF-токена
// axios.defaults.xsrfHeaderName = "X-CSRFToken"; // Заголовок CSRF-токена

function* authLoginSaga(action) {
  yield put(authStart());
  try {
    const res = yield call(axios.post, restAuth, {
      phone_number: action.phone_number,
    });
    const { access_token, refresh_token } = res.data;

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    }

    yield put(authSuccess(access_token));
    yield put(fetchUserRequest());
  } catch (error) {
    console.error("Error in authLoginSaga:", error);
    yield put(authFail(error.response?.data || error.message));
  }
}

function* watchAuthTokenExpiration() {
  const refreshTime = 9 * 60 * 1000; // Время ожидания (2 минуты)

  while (true) {
    // Ждем указанное время
    yield delay(refreshTime);

    // Запрашиваем обновление токена
    yield put(fetchRefreshTokenRequest());
  }
}

function* refreshAccessTokenSaga() {
  try {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;

    const res = yield call(axios.post, REFRESH_TOKEN, {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token: newRefreshToken } = res.data;

    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", newRefreshToken);
    }

    yield put(authSuccess(access_token));
  } catch (error) {
    yield put(refreshTokenFailure(error.response?.data || error.message));
  }
}

function* authSuccessSaga() {
  yield put(authStart());
  try {
    const userData = yield call(() => authAxios.get(userIDURL));
    yield put(fetchUserSuccess(userData.data));
  } catch (error) {
    yield put(authFail(error.response?.data || error.message));
  }
}

function* updateCompanyData(action) {
  try {
    const response = yield call(authAxios.patch, COMPANY_UPDATE, action.payload);
    yield put(updateCompanySuccess(response.data));
  } catch (error) {
    const errorMessage = error.response?.data?.error || "Произошла ошибка";
    yield put(updateCompanyFailure(errorMessage));
  }
}

export function* watchAuth() {
  yield all([
    takeLatest("AUTH_LOGIN", authLoginSaga),
    takeLatest("FETCH_USER_REQUEST", authSuccessSaga),
    takeLatest("FETCH_REFRESH_TOKEN_REQUEST", refreshAccessTokenSaga),
    takeLatest("COMPANY_UPDATE_REQUEST", updateCompanyData),
    fork(watchAuthTokenExpiration),
  ]);
}
