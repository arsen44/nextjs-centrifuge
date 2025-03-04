"use client";
import React from "react";
import useWebSocket from "../../../../../hook/useWebSocket";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
  Accordion,
  AccordionItem,
  Avatar,
  cn,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
} from "@nextui-org/react";
import { connect } from "react-redux";
import { deleteOrder } from "../../../../../store/actions/notify";
import { baseUrl } from "../../../../../helpers/constants";
import Tracking from "../tracking/tracking";

export const DeleteOrder = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clip-path="url(#clip0_293_108)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.44202 3.5H12.5C12.8978 3.5 13.2794 3.65804 13.5607 3.93934C13.842 4.22065 14 4.60218 14 5V11C14 11.3978 13.842 11.7794 13.5607 12.0607C13.2794 12.342 12.8978 12.5 12.5 12.5H5.44202C5.21711 12.5 4.99509 12.4493 4.7924 12.3519C4.5897 12.2544 4.41151 12.1126 4.27102 11.937L1.79602 8.844C1.60419 8.60452 1.49966 8.30684 1.49966 8C1.49966 7.69316 1.60419 7.39548 1.79602 7.156L4.27102 4.063C4.4113 3.88764 4.58917 3.74601 4.7915 3.64856C4.99382 3.55112 5.21545 3.50035 5.44002 3.5M3.09702 3.126C3.37832 2.77435 3.73518 2.49054 4.14113 2.29561C4.54708 2.10069 4.9917 1.99965 5.44202 2H12.5C13.2957 2 14.0587 2.31607 14.6213 2.87868C15.1839 3.44129 15.5 4.20435 15.5 5V11C15.5 11.7957 15.1839 12.5587 14.6213 13.1213C14.0587 13.6839 13.2957 14 12.5 14H5.44202C4.99204 14 4.5478 13.8989 4.14223 13.704C3.73665 13.509 3.38011 13.2254 3.09902 12.874L0.625019 9.781C0.220435 9.27556 0 8.64743 0 8C0 7.35258 0.220435 6.72444 0.625019 6.219L3.09702 3.126ZM7.28002 5.47C7.13784 5.33752 6.9498 5.2654 6.7555 5.26883C6.5612 5.27225 6.37581 5.35097 6.2384 5.48838C6.10098 5.62579 6.02227 5.81118 6.01884 6.00548C6.01542 6.19978 6.08754 6.38783 6.22002 6.53L7.69002 8L6.22002 9.47C6.14633 9.53866 6.08723 9.62146 6.04624 9.71346C6.00525 9.80546 5.9832 9.90478 5.98143 10.0055C5.97965 10.1062 5.99818 10.2062 6.0359 10.2996C6.07362 10.393 6.12976 10.4778 6.20098 10.549C6.2722 10.6203 6.35703 10.6764 6.45042 10.7141C6.54381 10.7518 6.64384 10.7704 6.74454 10.7686C6.84524 10.7668 6.94456 10.7448 7.03656 10.7038C7.12856 10.6628 7.21136 10.6037 7.28002 10.53L8.75002 9.06L10.22 10.53C10.2887 10.6037 10.3715 10.6628 10.4635 10.7038C10.5555 10.7448 10.6548 10.7668 10.7555 10.7686C10.8562 10.7704 10.9562 10.7518 11.0496 10.7141C11.143 10.6764 11.2278 10.6203 11.2991 10.549C11.3703 10.4778 11.4264 10.393 11.4641 10.2996C11.5019 10.2062 11.5204 10.1062 11.5186 10.0055C11.5168 9.90478 11.4948 9.80546 11.4538 9.71346C11.4128 9.62146 11.3537 9.53866 11.28 9.47L9.81002 8L11.28 6.53C11.4125 6.38783 11.4846 6.19978 11.4812 6.00548C11.4778 5.81118 11.3991 5.62579 11.2616 5.48838C11.1242 5.35097 10.9388 5.27225 10.7445 5.26883C10.5502 5.2654 10.3622 5.33752 10.22 5.47L8.75002 6.94L7.28002 5.47Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_293_108">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

interface IconWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const IconWrapper = ({ children, className }: IconWrapperProps) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>{children}</div>
);

const getStatusColor = (status: string) => {
  const colors = {
    REQUESTED: "warning",
    STARTED: "primary",
    IN_PROGRESS: "secondary",
    COMPLETED: "success",
  };
  return colors[status] || "default";
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("ru-RU", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price);
};

const CourierInfo = ({ courier_location }) => {
  if (!courier_location) return null;

  return (
    <div className="p-4 space-y-2">
      <div className="flex items-center gap-2">
        {courier_location.avatar ? (
          <img src={courier_location.avatar} alt="Курьер" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="bg-gray-200 rounded-full flex items-center justify-center">
            <Avatar className="w-20 h-20 text-large" src={baseUrl + courier_location.avatar} />
          </div>
        )}
        <div>
          <h3 className="font-medium">{courier_location.username || "Курьер"}</h3>
          <p className="text-sm text-gray-500">Рейтинг: {courier_location.rating || "Нет данных"}</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-sm">
          <span className="font-medium">Телефон:</span> {courier_location.phone_number || "Не указан"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Тип:</span> {courier_location.couriervariant || "Не указан"}
        </p>
        <p className="text-sm">
          <span className="font-medium">Статус:</span> {courier_location.status || "Не указан"}
        </p>
      </div>
    </div>
  );
};

const Order = ({ notifications, userID, infoState, deleteOrder, tracking }) => {
  const { sendMessage } = useWebSocket(userID);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!notifications || notifications.length === 0) {
    return <div className="p-4 text-center text-gray-500">Нет активных заказов</div>;
  }

  // Функция для отправки сообщения
  const handleSendMessageDelete = (notifications) => {
    if (!infoState) {
      console.log("WebSocket не подключен");
      return;
    }

    const message = {
      ...notifications,
      ID: notifications.ID,
      status: "DELETE",
    };

    // Отправляем сообщение через веб-сокет
    sendMessage("delete", message);

    // Обновляем состояние в Redux после успешной отправки
    deleteOrder(notifications.ID);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          <Tracking userID={userID} trackingData={tracking} />
        </ModalContent>
      </Modal>
      <Table aria-label="Таблица заказов" className="w-full" shadow="sm" selectionMode="single">
        <TableHeader>
          <TableColumn>ID ЗАКАЗА</TableColumn>
          <TableColumn>ДАТА СОЗДАНИЯ</TableColumn>
          <TableColumn>СТАТУС</TableColumn>
          <TableColumn>ОТКУДА</TableColumn>
          <TableColumn>КУДА</TableColumn>
          <TableColumn>ДОСТАВКА</TableColumn>
          <TableColumn>СУММА</TableColumn>
          <TableColumn />
        </TableHeader>
        <TableBody>
          {notifications.map((order) => (
            <React.Fragment key={order.ID}>
              <TableRow>
                <TableCell>
                  <Tooltip content={order.ID}>
                    <span>{order.ID.substring(0, 8)}...</span>
                  </Tooltip>
                </TableCell>
                <TableCell>{formatDate(order.Created)}</TableCell>
                <TableCell>
                  <Chip color={getStatusColor(order.status)} variant="flat">
                    {order.status}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Tooltip content={order?.pick_up_address?.phone_number}>
                    <span>{order?.pick_up_address?.address_name}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip content={order?.drop_off_address?.phone_number}>
                    <span>{order?.drop_off_address?.address_name}</span>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span>{order.deliveryvariant}</span>
                    {order.variation && (
                      <span className="text-tiny text-default-400">{order.variation.VariationName}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{formatPrice(order.amount)}</TableCell>
                <TableCell>
                  {order.status === "REQUESTED" && (
                    <button onClick={() => handleSendMessageDelete(order)}>
                      <IconWrapper className="bg-red-500/10 text-red-500">
                        <DeleteOrder className="text-lg" />
                      </IconWrapper>
                    </button>
                  )}
                  {order.status === "STARTED" && (
                    <Accordion>
                      <AccordionItem key={`courier-${order.ID}`} title="Информация о курьере">
                        <CourierInfo courier_location={order.courier_location} />
                      </AccordionItem>
                    </Accordion>
                  )}
                  <Button onPress={onOpen}>Отслеживать курьера</Button>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notify.notifications,
  infoState: state.notify.infoState,
  userID: state.auth.userData.id,
  tracking: state.notify?.tracking,
});

const mapDispatchToProps = (dispatch) => ({
  deleteOrder: (orderID) => dispatch(deleteOrder(orderID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Order);
