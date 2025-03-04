export const setSelectedCard = (id, name, price, variations) => ({
  type: 'SET_SELECTED_CARD',
  payload: {
    id: id,
    name: name,
    price: price,
    variations: variations,
  },
});
