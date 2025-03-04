import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import authAxios from "../../../../../helpers/utils";
import { Community } from "../icons/community";
import { CourierWalking } from "../icons/cardbalance/courier-walking-icon";
import { FaCar } from "../icons/cardbalance/fa-car";
import { FaTruck } from "../icons/cardbalance/fa-truck";

export const CardBalance2 = () => {
  const [courierStats, setCourierStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourierStats = async () => {
      try {
        const res = await authAxios.get("partner-company/courier-statistics/");
        console.log(res);
        setCourierStats(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || "Произошла ошибка");
        setLoading(false);
      }
    };

    fetchCourierStats();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // Создаем объект для сопоставления транспортных типов с иконками
  const transportIcons = {
    Пеший: <CourierWalking />,
    Авто: <FaCar />,
    Грузовой: <FaTruck />,
  };

  return (
    <Card className="xl:max-w-sm bg-default-50 rounded-xl shadow-md px-3 w-full h-[150px]">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <Community />
          <div className="flex flex-col">
            <span className="text-white text-base font-bolde">Всего курьеров</span>
          </div>
        </div>
        <div className="flex gap-14 py-3 items-center justify-center">
          {courierStats?.by_transport_type.map((type) => (
            <div key={type.courier_variant__name} className="flex flex-col items-center">
              {transportIcons[type.courier_variant__name] || <span>?</span>}
              <span>{type.count}</span>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
