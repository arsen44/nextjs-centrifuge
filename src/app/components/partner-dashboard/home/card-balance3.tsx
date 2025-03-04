import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { PackageIcon } from "../icons/cardbalance/package-icon";

export const CardBalance3 = ({ total_orders }: { total_orders: number }) => {
  return (
    <Card className="xl:max-w-sm bg-success rounded-xl shadow-md px-3 w-full h-[150px]">
      <CardBody className="py-5">
        <div className="flex gap-2.5">
          <PackageIcon />
          <div className="flex flex-col">
            <span className="text-white text-base font-bold">Всего выполненных заказов</span>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <span className="ext-white text-2xl font-medium">{total_orders}</span>
        </div>
      </CardBody>
    </Card>
  );
};
