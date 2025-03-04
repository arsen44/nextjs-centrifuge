import {
  CONNECT_WEBSOCKET,
  DISCONNECT_WEBSOCKET,
  RECEIVE_NOTIFY,
  TRACKING_DATA,
  SEND_MESSAGE,
  CLEAR_NOTIFY,
  DELETE_ORDER,
} from "../actions/notify";

const initialState = {
  notifications: [],
  isConnected: false,
  infoState: null,
  message: "",
  tracking: "",
};

const notify = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      return {
        ...state,
        infoState: action.payload,
      };
    case DISCONNECT_WEBSOCKET:
      return {
        ...state,
        isConnected: false,
      };
    case RECEIVE_NOTIFY:
      const newNotification = action.payload;
      // Проверяем, существует ли уже уведомление с таким ID
      const exists = state.notifications?.some(
        notification => notification.ID === newNotification.ID
      );
      
      // Если уведомление с таким ID уже существует, обновляем его
      if (exists) {
        return {
          ...state,
          notifications: state.notifications.map(notification =>
            notification.ID === newNotification.ID
              ? newNotification
              : notification
          ),
          notification: newNotification,
        };
      }
      
      // Если это новое уведомление, добавляем его в начало массива
      return {
        ...state,
        notifications: Array.isArray(state.notifications)
          ? [newNotification, ...state.notifications]
          : [newNotification],
        notification: newNotification,
      };

    case DELETE_ORDER:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.ID !== action.payload
        ),
      };

    case TRACKING_DATA:
      return {
        ...state,
        tracking: action.payload,
      };
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_NOTIFY:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
};

export default notify;