"use client";
import React from "react";
import { Image, cn } from "@nextui-org/react";
import { ConsumerIocn } from "../icons/ConsumerIcon";
import { DashboardIcon } from "../icons/DashboardIcon";
import { CarIcon } from "../icons/CarIocn";
import NextImage from "next/image";

interface interfaceProps {
  title: string;
  imageSrc: string;
  imageWidth: number;
  imageHeight: number;
  bgColor: string;
  Icon: string;
}

export const IconWrapper = ({ children, className }) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-16 h-16")}>{children}</div>
);

const PortalSection = ({ Icon, imageSrc, imageWidth, imageHeight, title, bgColor }: interfaceProps) => (
  <div className="flex flex-col items-center gap-8 md:gap-16 w-full md:w-auto mb-12 md:mb-0">
    <div className="flex flex-col items-center gap-3">
      <IconWrapper className={`${bgColor} border border-gray-600`}>
        <Icon />
      </IconWrapper>
      <span className="w-48 text-center text-white text-base font-medium font-outfit leading-tight">{title}</span>
    </div>
    <div className="relative w-full flex justify-center">
      <Image
        as={NextImage}
        src={imageSrc}
        width={imageWidth}
        height={imageHeight}
        alt={title}
        className="max-w-full h-auto object-contain"
      />
    </div>
  </div>
);

const ConsumerPortal = () => {
  const sections = [
    {
      Icon: ConsumerIocn,
      imageSrc: "/images/consumer.png",
      imageWidth: 290,
      imageHeight: 600,
      title: "Клиентское приложение",
      bgColor: "bg-[#DEF54F]",
    },
    {
      Icon: DashboardIcon,
      imageSrc: "/images/lapto.png",
      imageWidth: 886,
      imageHeight: 600,
      title: "Dashboard",
      bgColor: "bg-[#57CC7E]",
    },
    {
      Icon: CarIcon,
      imageSrc: "/images/driver.png",
      imageWidth: 290,
      imageHeight: 600,
      title: "Приложение для водителя",
      bgColor: "bg-[#6AC9FF]",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-8 md:gap-6 px-4 md:px-6">
      {sections.map((section, index) => (
        <PortalSection key={index} {...section} />
      ))}
    </div>
  );
};

export default ConsumerPortal;
