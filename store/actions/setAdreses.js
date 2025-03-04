export const CLEAR_ROUTE = 'CLEAR_ROUTE';

export const setStartAddress = addressData => ({
  type: 'SET_START_ADDRESS',
  payload: addressData,
});

export const setEndAddress = addressData => ({
  type: 'SET_END_ADDRESS',
  payload: addressData,
});

export const setSuggestions = suggestions => ({
  type: 'SET_SUGGESTIONS',
  payload: suggestions,
});

export const setRouteData = routeData => ({
  type: 'SET_ROUTE_DATA',
  payload: routeData,
});

export const buildRoute = (startAddress, endAddress) => ({
  type: 'BUILD_ROUTE',
  payload: {startAddress, endAddress},
});

export const buildRouteFailure = error => ({
  type: 'BUILD_ROUTE_FAILURE',
  payload: error,
});

export const clearRoute = () => ({
  type: CLEAR_ROUTE,
});
