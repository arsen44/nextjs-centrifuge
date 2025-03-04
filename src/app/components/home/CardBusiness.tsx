import React from "react";
import { Card, Button, Link } from "@nextui-org/react";
import Image from "next/image";
import { LeftIocn } from "../icons/LeftIocn";

export default function CardBusiness() {
  return (
    <Card className="w-full bg-[#161616] p-8">
      <div className="flex flex-col md:flex-row gap-28 items-center justify-between">
        {/* Text Content */}
        <div className="flex flex-col gap-16 flex-1">
          <h2 className="text-white text-3xl font-semibold leading-tight">Платите за доставку - никаких комиссий</h2>
          <div className="flex flex-col gap-8">
            <p className="text-white text-xl font-medium leading-relaxed">
              Roxo - это экономически эффективный способ доставки товаров и удовлетворения ожиданий клиентов.
            </p>
            <Button color="primary" endContent={<LeftIocn />} as={Link} href="/login/" variant="flat" className="w-44">
              Начать
            </Button>
          </div>
        </div>

        {/* Staggered Image Grid */}
        <div className="relative flex gap-3 flex-1">
          <div className="rounded-lg">
            <Image src="/images/flowers.png" alt="Flowers" width={200} height={430} />
          </div>
          <div className="rounded-lg">
            <Image src="/images/clothing-stylist.png" alt="clothing-stylist" width={200} height={430} />
          </div>
          <div className="rounded-lg">
            <Image src="/images/barista.png" alt="barista" width={200} height={430} />
          </div>
        </div>
      </div>
    </Card>
  );
}
