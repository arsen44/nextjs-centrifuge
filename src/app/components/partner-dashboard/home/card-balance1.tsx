import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import { MoneyIcon } from "../icons/cardbalance/money-icon";

export const CardBalance1 = ({ total_amount }: { total_amount: number }) => {
  return (
    <Card className="xl:max-w-sm bg-primary rounded-xl shadow-md px-3 w-full h-[150px]">
      <CardBody className="py-5 overflow-hidden">
        <div className="flex gap-2.5">
          <MoneyIcon />
          <div className="flex flex-col">
            <span className="text-white text-base font-bold">Месяц</span>
          </div>
        </div>
        <div className="flex gap-2.5 py-2 items-center justify-center">
          <span className="text-white text-2xl font-medium">₽ {total_amount}</span>
          <span className="text-success text-xs">+ 4.5%</span>
        </div>
      </CardBody>
    </Card>
  );
};
