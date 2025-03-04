import { persistor } from "../creatReducer";

export const COMPANY_UPDATE_REQUEST = 'COMPANY_UPDATE_REQUEST';
export const COMPANY_UPDATE_SUCCESS = 'COMPANY_UPDATE_SUCCESS';
export const COMPANY_UPDATE_FAILURE = 'COMPANY_UPDATE_FAILURE';


export const authStart = () => {
  return {
    type: "AUTH_START",
  };
};

export const authSuccess = (token: string) => {
  return {
    type: "AUTH_SUCCESS",
    token: token,
  };
};

export const authLogin = (phone_number: string) => {
  return {
    type: "AUTH_LOGIN",
    phone_number,
  };
};

export const authFail = (error: string) => {
  return {
    type: "AUTH_FAIL",
    error: error,
  };
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  persistor.purge();

  return {
    type: "AUTH_LOGOUT",
  };
};

export const fetchUserRequest = () => ({
  type: "FETCH_USER_REQUEST",
});

export const fetchRefreshTokenRequest = () => ({
  type: "FETCH_REFRESH_TOKEN_REQUEST",
});

export const fetchUserSuccess = (userData) => ({
  type: "FETCH_USER_SUCCESS",
  payload: userData,
});

// Действие, которое будет вызываться в случае неудачного обновления токена
export const refreshTokenFailure = (error) => ({
  type: "REFRESH_TOKEN_FAILURE",
  payload: error, // Ошибка
});




// actions/companyActions.js
export const updateCompany = (data) => ({
  type: COMPANY_UPDATE_REQUEST,
  payload: data
});

export const updateCompanySuccess = (data) => ({
  type: COMPANY_UPDATE_SUCCESS,
  payload: data
});

export const updateCompanyFailure = (error) => ({
  type: COMPANY_UPDATE_FAILURE,
  payload: error
});