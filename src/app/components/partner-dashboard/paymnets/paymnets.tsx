"use client";
import React, { useState, useEffect, useCallback } from "react";
import authAxios from "../../../../../helpers/utils";
import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
} from "@nextui-org/react";

const PaymentStatus = ({ paid }) => (
  <Chip color={paid ? "success" : "warning"} size="md">
    {paid ? "Оплачен" : "Не оплачен"}
  </Chip>
);

const ErrorMessage = ({ message }) => (
  <Card className="w-full">
    <CardBody>
      <p>Ошибка загрузки: {message}</p>
    </CardBody>
  </Card>
);

const LoadingIndicator = () => (
  <Card className="w-full flex justify-center items-center h-64">
    <Spinner label="Загрузка..." />
  </Card>
);

export default function Payments() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await authAxios.get("partner-company/earnings-payments/");
      setOrders(data.recent_orders || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div>
      <h2 className="text-xl font-bold pl-7 mt-7">Список заказов</h2>
      <div className="m-8">
        <Table aria-label="Orders table">
          <TableHeader>
            <TableColumn>№</TableColumn>
            <TableColumn>Дата</TableColumn>
            <TableColumn>Курьер</TableColumn>
            <TableColumn>Выд доставки</TableColumn>
            <TableColumn>Сумма</TableColumn>
            <TableColumn>Статус оплаты</TableColumn>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                <TableCell>{order.order_delivery_details.courier.user.username}</TableCell>
                <TableCell>{order.order_delivery_details.courier.courier_variant}</TableCell>
                <TableCell>{order.amount} ₽</TableCell>
                <TableCell>
                  <PaymentStatus paid={order.paid} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
