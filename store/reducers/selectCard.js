const initialState = {
  selectedCard: {
    id: null,
    name: null,
    price: null,
    variations: [],
  },
};

const actionCreatorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SELECTED_CARD':
      return {
        ...state,
        selectedCard: {
          ...state.selectedCard,
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          variations: action.payload.variations,
        },
      };
    // другие обработчики действий (actions)
    default:
      return state;
  }
};

export default actionCreatorsReducer;
