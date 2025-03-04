import { COMPANY_UPDATE_REQUEST, COMPANY_UPDATE_SUCCESS, COMPANY_UPDATE_FAILURE } from "../actions/auth";

const initialState = {
  token: null,
  error: null,
  loading: false,
  userData: null,
};

const authStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    token: action.token,
    error: null,
    loading: false,
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false,
  };
};

const authLogout = (state, action) => {
  return {
    ...state,
    token: null,
  };
};

const refreshStart = (state, action) => {
  return {
    ...state,
    error: null,
    loading: true,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_START":
      return authStart(state, action);
    case "AUTH_SUCCESS":
      return authSuccess(state, action);
    case "AUTH_FAIL":
      return authFail(state, action);
    case "AUTH_LOGOUT":
      return authLogout(state, action);
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        userData: action.payload, // Обновляем состояние с данными пользователя
        loading: false, // Сбрасываем флаг загрузки, если он был установлен
      };
    case "FETCH_REFRESH_TOKEN_REQUEST":
      return refreshStart(state, action);
    case "REFRESH_TOKEN_FAILURE":
      return {
        ...state,
        error: action.payload, // устанавливаем ошибку
      };
    case "COMPANY_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "COMPANY_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        userData: {
          ...state.userData,
          company: {
            ...state.userData.company,
            ...action.payload,
          },
        },
      };

    case "COMPANY_UPDATE_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
