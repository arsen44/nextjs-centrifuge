export const FETCH_PAYMENT_CARD = 'FETCH_PAYMENT_CARD';
export const FETCH_PAYMENT_CARD_SUCCESS = 'FETCH_PAYMENT_CARD_SUCCESS';
export const FETCH_CARD_FAILURE = 'FETCH_CARD_FAILURE';
export const UPDATE_PAYMENT_CARD = 'UPDATE_PAYMENT_CARD';
export const DELETE_PAYMENT_CARD = 'DELETE_PAYMENT_CARD';

export const fetchPaymentCard = () => ({
  type: FETCH_PAYMENT_CARD,
});

export const fetchPaymentCardSuccess = paymentCards => ({
  type: FETCH_PAYMENT_CARD_SUCCESS,
  payload: paymentCards,
});

export const fetchCardFailError = error => {
  return {
    type: FETCH_CARD_FAILURE,
    error: error,
  };
};

export const updatePaymentCard = (cardId, updatedCardData) => ({
  type: UPDATE_PAYMENT_CARD,
  payload: {cardId, updatedCardData},
});

export const deletePaymentCard = cardId => ({
  type: DELETE_PAYMENT_CARD,
  payload: cardId,
});