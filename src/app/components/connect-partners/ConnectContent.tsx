import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import Portal from "./Portal";
import { LineIocn } from "../icons/LineIcon";

export default function ConnectContent() {
  return (
    <div className="flex flex-col items-center w-full">
      <Card className="max-w-[450px]">
        <CardBody>
          <p className="text-2xl leading-relaxed">Обновления в режиме реального времени со всеми функциональность в рамках одной системы</p>
        </CardBody>
      </Card>
      <div className="hidden md:block">
        <LineIocn />
      </div>
      <div className="m-2 md:mt-2 w-full">
        <Portal />
      </div>
    </div>
  );
}
