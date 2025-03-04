export const addToOrder = (
  pickupaddress,
  dropoffaddress,
  variation,
  loader,
  client,
  amount,
  deliveryvariant,
  pickupaddress_phoneNumber,
  pickupaddress_flatNumber,
  pickupaddress_entranceNumber,
  pickupaddress_floorNumber,
  pickupaddress_intercomNumber,
  pickupaddress_clientComment,
  pickupaddress_phonenumber,
  dropoffaddress_flatNumber,
  dropoffaddress_entranceNumber,
  dropoffaddress_floorNumber,
  dropoffaddress_intercomNumber,
  dropoffaddress_clientComment,
  dropoffaddress_phonenumber,
) => ({
  type: 'ORDER_CREATE_REQUEST',
  payload: {
    pickupaddress,
    dropoffaddress,
    variation,
    client,
    amount,
    deliveryvariant,
    loader,
    pickupaddress_phoneNumber,
    pickupaddress_flatNumber,
    pickupaddress_entranceNumber,
    pickupaddress_floorNumber,
    pickupaddress_intercomNumber,
    pickupaddress_clientComment,
    pickupaddress_phonenumber,
    dropoffaddress_flatNumber,
    dropoffaddress_entranceNumber,
    dropoffaddress_floorNumber,
    dropoffaddress_intercomNumber,
    dropoffaddress_clientComment,
    dropoffaddress_phonenumber,
  },
});

export const addToOrderSuccess = () => ({
  type: 'ADD_TO_ORDER_SUCCESS',
});

export const addToOrderFailure = error => ({
  type: 'ADD_TO_ORDER_FAILURE',
  payload: {
    error,
  },
});

export const updatePickupAddress = pickupAddress => ({
  type: 'UPDATE_PICKUP_ADDRESS',
  payload: {
    pickupAddress,
  },
});

// Экшен для обновления поля dropoffaddress
export const updateDropoffAddress = dropoffAddress => ({
  type: 'UPDATE_DROPOFF_ADDRESS',
  payload: {
    dropoffAddress,
  },
});

// Экшен для обновления поля client
export const updateClient = client => ({
  type: 'UPDATE_CLIENT',
  payload: {
    client,
  },
});

export const updateVaration = variation => ({
  type: 'UPDATE_VARATION',
  payload: {
    variation,
  },
});

export const updateAmount = amount => ({
  type: 'UPDATE_AMOUNT',
  payload: {
    amount,
  },
});

export const updateDeliveryvariant = deliveryvariant => ({
  type: 'UPDATE_DELIVERYVARIANT',
  payload: {
    deliveryvariant,
  },
});

export const updatePickupFlatNumber = pickupaddress_flatNumber => ({
  type: 'UPDATE_PICKUP_FLAT_NUMBER',
  payload: {
    pickupaddress_flatNumber,
  },
});

export const updatePickupPhoneNumber = pickupaddress_phonenumber => ({
  type: 'UPDATE_PICKUP_PHONE_NUMBER',
  payload: {
    pickupaddress_phonenumber,
  },
});

export const updatePickupEntranceNumber = pickupaddress_entranceNumber => ({
  type: 'UPDATE_PICKUP_ENTRANCE_NUMBER',
  payload: {
    pickupaddress_entranceNumber,
  },
});

export const updatePickupIntercomNumber = pickupaddress_intercomNumber => ({
  type: 'UPDATE_PICKUP_INTERCOM_NUMBER',
  payload: {
    pickupaddress_intercomNumber,
  },
});

export const updatePickupFloorNumber = pickupaddress_floorNumber => ({
  type: 'UPDATE_PICKUP_FLOOR_NUMBER',
  payload: {
    pickupaddress_floorNumber,
  },
});

export const updatePickupClientComment = pickupaddress_clientComment => ({
  type: 'UPDATE_PICKUP_CLIENT_COMMENT',
  payload: {
    pickupaddress_clientComment,
  },
});

export const updateDropoffFlatNumber = dropoffaddress_flatNumber => ({
  type: 'UPDATE_DROPOFF_FLAT_NUMBER',
  payload: {
    dropoffaddress_flatNumber,
  },
});

export const updateDropoffPhoneNumber = dropoffaddress_phonenumber => ({
  type: 'UPDATE_DROPOFF_PHONE_NUMBER',
  payload: {
    dropoffaddress_phonenumber,
  },
});

export const updateDropoffEntranceNumber = dropoffaddress_entranceNumber => ({
  type: 'UPDATE_DROPOFF_ENTRANCE_NUMBER',
  payload: {
    dropoffaddress_entranceNumber,
  },
});

export const updateDropoffIntercomNumber = dropoffaddress_intercomNumber => ({
  type: 'UPDATE_DROPOFF_INTERCOM_NUMBER',
  payload: {
    dropoffaddress_intercomNumber,
  },
});

export const updateDropoffFloorNumber = dropoffaddress_floorNumber => ({
  type: 'UPDATE_DROPOFF_FLOOR_NUMBER',
  payload: {
    dropoffaddress_floorNumber,
  },
});

export const updateDropoffClientComment = dropoffaddress_clientComment => ({
  type: 'UPDATE_DROPOFFP_CLIENT_COMMENT',
  payload: {
    dropoffaddress_clientComment,
  },
});

export const clearOrder = () => ({
  type: 'CLEAR_ORDER',
});

export const updateLoader = loader => ({
  type: 'LOADER_UPDATE',
  payload: {
    loader,
  },
});
