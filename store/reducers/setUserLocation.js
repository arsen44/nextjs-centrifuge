import {
  GET_LOCATION_FAILURE,
  GET_WATCH_LOCATION_REQUEST,
  SEND_TRAKING,
  GET_GEO_LOCATION_PENDING,
} from '../actions/setUserLocation';

const initialState = {
  userLocation: null,
  loading: false,
  error: null,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GEO_LOCATION_PENDING:
      return {...state, loading: true};
    case GET_LOCATION_FAILURE:
      return {...state, loading: false, error: action.payload};
    case GET_WATCH_LOCATION_REQUEST:
      return {...state, loading: true};
    case SEND_TRAKING:
      return {...state, userLocation: action.payload};
    default:
      return state;
  }
};

export default reducer;
