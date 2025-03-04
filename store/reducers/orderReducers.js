import {loader} from '../actions/orderActions';

// Изначальное состояние
const initialState = {
  orders: {
    pickupaddress: [],
    dropoffaddress: [],
    variation: [],
    loader: [],
    client: null,
    amount: null,
    deliveryvariant: null,
    pickupaddress_phonenumber: null,
    pickupaddress_flatNumber: null,
    pickupaddress_entranceNumber: null,
    pickupaddress_floorNumber: null,
    pickupaddress_intercomNumber: null,
    pickupaddress_clientComment: null,
    dropoffaddress_flatNumber: null,
    dropoffaddress_entranceNumber: null,
    dropoffaddress_floorNumber: null,
    dropoffaddress_intercomNumber: null,
    dropoffaddress_clientComment: null,
    dropoffaddress_phonenumber: null,
  },
};

// Редьюсер для обработки действий
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_ORDER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress: action.payload.pickupaddress,
          dropoffaddress: action.payload.dropoffaddress,
          pickupaddress_phonenumber: action.payload.pickupaddress_phonenumber,
          pickupaddress_flatNumber: action.payload.pickupaddress_flatNumber,
          pickupaddress_entranceNumber:
            action.payload.pickupaddress_entranceNumber,
          pickupaddress_intercomNumber:
            action.payload.pickupaddress_intercomNumber,
          pickupaddress_clientComment:
            action.payload.pickupaddress_clientComment,
          dropoffaddress_phonenumber: action.payload.dropoffaddress_phonenumber,
          dropoffaddress_flatNumber: action.payload.dropoffaddress_flatNumber,
          dropoffaddress_entranceNumber:
            action.payload.dropoffaddress_entranceNumber,
          dropoffaddress_intercomNumber:
            action.payload.dropoffaddress_intercomNumber,
          dropoffaddress_clientComment:
            action.payload.dropoffaddress_clientComment,
          client: action.payload.client,
          variation: action.payload.variation,
          loader: action.payload.loader,
          amount: action.payload.amount,
          deliveryvariant: action.payload.deliveryvariant,
        },
      };

    case 'UPDATE_PICKUP_ADDRESS':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress: action.payload.pickupAddress,
        },
      };

    case 'UPDATE_DROPOFF_ADDRESS':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress: action.payload.dropoffAddress,
        },
      };

    case 'UPDATE_CLIENT':
      return {
        ...state,
        orders: {
          ...state.orders,
          client: action.payload.client,
        },
      };

    case 'UPDATE_VARATION':
      return {
        ...state,
        orders: {
          ...state.orders,
          variation: action.payload.variation,
        },
      };

    case 'LOADER_UPDATE':
      return {
        ...state,
        orders: {
          ...state.orders,
          loader: action.payload.loader,
        },
      };

    case 'UPDATE_AMOUNT':
      return {
        ...state,
        orders: {
          ...state.orders,
          amount: action.payload.amount,
        },
      };

    case 'UPDATE_DELIVERYVARIANT':
      return {
        ...state,
        orders: {
          ...state.orders,
          deliveryvariant: action.payload.deliveryvariant,
        },
      };

    case 'UPDATE_PICKUP_FLAT_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_flatNumber: action.payload.pickupaddress_flatNumber,
        },
      };

    case 'UPDATE_PICKUP_FLOOR_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_floorNumber: action.payload.pickupaddress_floorNumber,
        },
      };

    case 'UPDATE_PICKUP_PHONE_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_phonenumber: action.payload.pickupaddress_phonenumber,
        },
      };

    case 'UPDATE_PICKUP_ENTRANCE_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_entranceNumber:
            action.payload.pickupaddress_entranceNumber,
        },
      };

    case 'UPDATE_PICKUP_INTERCOM_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_intercomNumber:
            action.payload.pickupaddress_intercomNumber,
        },
      };

    case 'UPDATE_PICKUP_CLIENT_COMMENT':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress_clientComment:
            action.payload.pickupaddress_clientComment,
        },
      };

    case 'UPDATE_DROPOFF_FLAT_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_flatNumber: action.payload.dropoffaddress_flatNumber,
        },
      };

    case 'UPDATE_DROPOFF_PHONE_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_phonenumber: action.payload.dropoffaddress_phonenumber,
        },
      };

    case 'UPDATE_DROPOFF_ENTRANCE_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_entranceNumber:
            action.payload.dropoffaddress_entranceNumber,
        },
      };

    case 'UPDATE_DROPOFF_INTERCOM_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_intercomNumber:
            action.payload.dropoffaddress_intercomNumber,
        },
      };

    case 'UPDATE_DROPOFF_FLOOR_NUMBER':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_floorNumber: action.payload.dropoffaddress_floorNumber,
        },
      };

    case 'UPDATE_DROPOFF_CLIENT_COMMENT':
      return {
        ...state,
        orders: {
          ...state.orders,
          dropoffaddress_clientComment:
            action.payload.dropoffaddress_clientComment,
        },
      };

    case 'CLEAR_ORDER':
      return {
        ...state,
        orders: {
          ...state.orders,
          pickupaddress: [],
          dropoffaddress: [],
          client: null,
          amount: null,
          pickupaddress_phonenumber: null,
          pickupaddress_flatNumber: null,
          pickupaddress_entranceNumber: null,
          pickupaddress_floorNumber: null,
          pickupaddress_intercomNumber: null,
          pickupaddress_clientComment: null,
          dropoffaddress_flatNumber: null,
          dropoffaddress_entranceNumber: null,
          dropoffaddress_floorNumber: null,
          dropoffaddress_intercomNumber: null,
          dropoffaddress_clientComment: null,
          dropoffaddress_phonenumber: null,
        },
      };

    default:
      return state;
  }
};

export default orderReducer;
