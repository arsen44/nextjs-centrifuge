import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, disconnectWebSocket, receiveNotification, trackingData } from "../store/actions/notify";
import { WsbaseUrl } from "../helpers/constants";
import { Centrifuge } from "centrifuge";

const useWebSocket = (userID, onClose = () => {}) => {
  const dispatch = useDispatch();
  const centrifugeRef = useRef(null);
  const notification = useSelector((state) => state.notify.notification);

  const connectWebSocketNotify = () => {
    let subTracking = null;
    try {
      centrifugeRef.current = new Centrifuge(WsbaseUrl, {
        token: "roxo:CYhzWznVWumqUTtfA_T7okequU5A_S80hEavLLKJ_YE=",
        getToken: function () {
          return Promise.resolve("roxo:CYhzWznVWumqUTtfA_T7okequU5A_S80hEavLLKJ_YE=");
        },
      });

      centrifugeRef.current.on("connect", () => {
        dispatch(connectWebSocket());
      });

      centrifugeRef.current.on("disconnect", (context) => {
        dispatch(disconnectWebSocket());
        onClose(context);
      });

      centrifugeRef.current.on("error", (error) => {
        //onError(error);
      });

      // Подписка на канал
      const notifications = "notifications:" + userID;
      const subNotifications = centrifugeRef.current.newSubscription(notifications);

      subNotifications.on("publication", (message) => {
        console.log(message.data);
        dispatch(receiveNotification(message.data));
      });

      // Подписка на трекинг-канал, если notification содержит id
      if (notification && notification.courier_id) {
        const trackingChannel = `tracking:${notification.courier_id}`; // Используйте id из notification
        const subTracking = centrifugeRef.current.newSubscription(trackingChannel);
        subTracking.on("publication", (message) => {
          console.log("Получено сообщение трекинга:", message.data);
          dispatch(trackingData(message.data));
        });

        subTracking.subscribe(); // Подписываемся на трекинг
      }

      subNotifications.subscribe();

      centrifugeRef.current.connect();

      dispatch(connectWebSocket(centrifugeRef.current.state));

      return () => {
        subNotifications.unsubscribe();
        if (subTracking) {
          // Проверка на существование subTracking
          subTracking.unsubscribe();
        }
        //centrifugeRef.current.disconnect();
      };
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = (channel, message) => {
    centrifugeRef.current.publish(channel, message).then(
      () => {
        console.log("Message sent:", message);
      },
      (error) => {
        console.error("Failed to send message:", error);
      }
    );
  };

  useEffect(() => {
    const cleanup = connectWebSocketNotify();
    return cleanup;
  }, [WsbaseUrl]);

  return { sendMessage };
};

export default useWebSocket;
