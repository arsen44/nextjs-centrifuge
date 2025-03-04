import {
    FETCH_PAYMENT_CARD_SUCCESS,
    UPDATE_PAYMENT_CARD,
    DELETE_PAYMENT_CARD,
    FETCH_CARD_FAILURE,
  } from '../actions/payment';
  
  const initialState = {
    paymentCards: [],
    error: null,
  };
  
  const fetchPaymentsCardSuccess = (state, action) => {
    return {
      ...state,
      paymentCards: action.payload,
      error: null,
    };
  };
  
  const fetchCardFailError = (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  };
  
  const deletePaymentCard = (state, action) => {
    return {
      ...state,
      paymentCards: state.paymentCards.filter(card => card.id !== action.payload),
    };
  };
  
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAYMENT_CARD_SUCCESS:
        return fetchPaymentsCardSuccess(state, action);
  
      case FETCH_CARD_FAILURE:
        return fetchCardFailError(state, action);
  
      case UPDATE_PAYMENT_CARD:
        return {
          ...state,
          paymentCards: state.paymentCards.map(card =>
            card.id === action.payload.cardId
              ? {...card, ...action.payload.updatedCardData}
              : card,
          ),
        };
  
      case DELETE_PAYMENT_CARD:
        return deletePaymentCard(state, action);
      default:
        return state;
    }
  };
  
  export default paymentReducer;