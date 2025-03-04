import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Avatar } from "@nextui-org/react";
import authAxios from "../../../../../helpers/utils";

interface CourierProps {
  id: number;
  user: {
    username: string;
    first_name: string;
    last_name: string;
  };
  phone_number: string;
  status: string;
  rating: number;
  avatar: string;
}

export const TableWrapper = () => {
  const [couriers, setCouriers] = useState<CourierProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyCouriers = async () => {
      try {
        const response = await authAxios.get("partner-company/couriers/");
        setCouriers(response.data.couriers);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Ошибка загрузки курьеров");
        setLoading(false);
      }
    };

    fetchCompanyCouriers();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className=" w-full flex flex-col gap-4">
      <Table aria-label="Таблица курьеров компании">
        <TableHeader>
          <TableColumn>ИМЯ</TableColumn>
          <TableColumn>ТЕЛЕФОН</TableColumn>
          <TableColumn>СТАТУС</TableColumn>
          <TableColumn>РЕЙТИНГ</TableColumn>
        </TableHeader>
        <TableBody>
          {couriers.map((courier) => (
            <TableRow key={courier.id}>
              <TableCell>
                {courier.user.first_name} {courier.user.last_name}{" "}
                <Avatar isBordered color="secondary" src={courier.avatar} />
              </TableCell>
              <TableCell>{courier.phone_number}</TableCell>
              <TableCell>{courier.status}</TableCell>
              <TableCell>{courier.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
