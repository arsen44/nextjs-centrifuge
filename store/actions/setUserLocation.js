export const GET_GEO_LOCATION_PENDING = 'GET_GEO_LOCATION_PENDING';
export const GET_WATCH_LOCATION_REQUEST = 'GET_WATCH_LOCATION_REQUEST';
export const GET_LOCATION_FAILURE = 'GET_LOCATION_FAILURE';
export const SEND_TRAKING = 'SEND_TRAKING';

export const getGeoLocation = () => ({
  type: GET_GEO_LOCATION_PENDING,
});

export const watchLocationRequest = () => ({
  type: GET_WATCH_LOCATION_REQUEST,
});

export const getLocationFailure = error => ({
  type: GET_LOCATION_FAILURE,
  payload: error,
});

export const sendTraking = location => ({
  type: SEND_TRAKING,
  payload: location,
});
