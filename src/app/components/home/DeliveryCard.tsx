import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import Image from "next/image";

interface InterfaceProps {
  title: string;
  subtitle: string;
  image: string;
}

// Компонент карточки доставки
export default function DeliveryCard({ title, subtitle, image }: InterfaceProps) {
  return (
    <Card className="py-4 w-[390px] h-[490px] bg-[#161616] border-l border-t border-[#b0e2f9]/20">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <article className="text-wrap m-3 flex flex-col gap-3">
          <h4 className="text-center text-white text-3xl font-extrabold leading-[30px]">{title}</h4>
          <p className="line-clamp-4 text-white text-[16px] font-normal">{subtitle}</p>
        </article>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image alt={`${title} доставка`} className="object-cover rounded-xl" src={image} fill />
      </CardBody>
    </Card>
  );
}
