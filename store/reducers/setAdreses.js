import {CLEAR_ROUTE} from '../actions/setAdreses';

const initialState = {
  startAddress: [],
  endAddress: [],
  suggestions: [],
  selectedAddress: null,
  routeData: null,
  activeTextInput: null,
};

const autocompleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_START_ADDRESS':
      return {...state, startAddress: action.payload};
    case 'SET_END_ADDRESS':
      return {...state, endAddress: action.payload};
    case 'SET_SUGGESTIONS':
      return {
        ...state,
        suggestions: action.payload,
      };
    case 'SET_SELECTED_ADDRESS':
      return {
        ...state,
        selectedAddress: action.payload,
      };
    case 'SET_ROUTE_DATA':
      return {
        ...state,
        routeData: action.payload,
      };
    case 'SET_ACTIVE_TEXT_INPUT':
      return {
        ...state,
        activeTextInput: action.payload,
      };
    case CLEAR_ROUTE:
      return {
        ...state,
        routeData: null,
      };
    default:
      return state;
  }
};

export default autocompleteReducer;
