import React, { useState, useEffect } from "react";
import authAxios from "../../../../../helpers/utils";
import { Avatar, Card, CardBody } from "@nextui-org/react";

export const CardTransactions = () => {
  const [earnings, setEarnings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const response = await authAxios.get("partner-company/courier-earnings/");
        setEarnings(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Произошла ошибка");
        setLoading(false);
      }
    };

    fetchEarnings();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <Card className="bg-default-50 rounded-xl shadow-md px-3">
      <CardBody className="py-5 gap-4">
        <div className="flex gap-2.5 justify-center">
          <div className="flex flex-col border-dashed border-2 border-divider py-2 px-6 rounded-xl">
            <span className="text-default-900 text-xl font-semibold">Последние транзакции</span>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {earnings.map((item) => (
            <div key={item.id} className="grid grid-cols-4 w-full">
              <div className="w-full">
                <Avatar isBordered color="secondary" src={item.courier.avatar} />
              </div>

              <span className="text-default-900 font-semibold">{item.courier.username}</span>
              <div>
                <span className="text-success text-xs">{item.amount} ₽</span>
              </div>
              <div>
                <span className="text-default-500 text-xs">{new Date(item.date).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
