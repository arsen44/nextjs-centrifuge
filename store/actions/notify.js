export const CONNECT_WEBSOCKET = "CONNECT_WEBSOCKET";
export const DISCONNECT_WEBSOCKET = "DISCONNECT_WEBSOCKET";
export const RECEIVE_NOTIFY = "RECEIVE_NOTIFY";
export const SEND_MESSAGE = "SEND_MESSAGE";
export const CLEAR_NOTIFY = "CLEAR_NOTIFY";
export const TRACKING_DATA = "TRACKING_DATA";

// Redux actions
export const DELETE_ORDER = "DELETE_ORDER";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";

export const connectWebSocket = (infoState) => ({
  type: CONNECT_WEBSOCKET,
  payload: infoState,
});

export const disconnectWebSocket = () => ({
  type: DISCONNECT_WEBSOCKET,
});

export const receiveNotification = (notification) => ({
  type: RECEIVE_NOTIFY,
  payload: notification,
});

export const clearNotify = () => ({
  type: CLEAR_NOTIFY,
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const trackingData = (tracking) => ({
  type: TRACKING_DATA,
  payload: tracking,
});


// Action creators DELETE
export const deleteOrder = (orderId) => ({
  type: DELETE_ORDER,
  payload: orderId
});


