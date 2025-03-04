import React from "react";
import { Card, Button } from "@nextui-org/react";
import Image from "next/image";
import AddressForm from "../autocomplete/addressForm";

interface InterfaceProps {
  onPress(): void;
}

export default function CardHead({ onPress }: InterfaceProps) {
  return (
    <Card className="w-full bg-[#161616]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 lg:gap-28">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 flex flex-col md:p-10">
          <div className="space-y-5 md:p-10 p-5">
            <h1 className="text-white md:text-[32px] text-[22px] font-extrabold leading-[29px]">Быстрая доставка</h1>
            <AddressForm type="pickup" />
            <AddressForm type="dropoff" />
            <Button
              onPress={onPress}
              className="h-[54px] rounded-[12px] text-center text-white text-2xl font-normal leading-[29px]"
              fullWidth
              color="primary"
              variant="shadow"
            >
              Рассчитать
            </Button>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <div className="relative w-full aspect-[719/496]">
            <Image src="/images/location.webp" fill className="object-contain" alt="Location illustration" />
          </div>
        </div>
      </div>
    </Card>
  );
}
