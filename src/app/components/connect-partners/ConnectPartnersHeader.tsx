import React from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import Image from "next/image";
import job from "../../../../public/images/job.png";

function ConnectPartnersHeader({ onPress }) {
  return (
    <Card className="flex flex-col-reverse lg:flex-row justify-center">
      <CardBody className="flex lg:flex-1 flex-col items-start">
        <div className="flex flex-col justify-between lg:gap-9 m-4 gap-2">
          <div className="flex flex-col gap-6">
            <span className="text-white text-4xl font-medium font-['Outfit'] leading-[46px]">
              Зарабатывайте ещё больше с вашими курьерами и
              <a className="ml-2 text-[#00d0ff] text-4xl font-medium font-['Outfit'] leading-[46px]">Roxo</a>
            </span>
            <span className="text-white text-4xl font-medium font-['Outfit'] leading-[46px]">
              Подключитесь и выполняйте доставки, любыми курьерами и на любом транспорте, в любое время суток и в любой
              день.
            </span>
          </div>
          <Button
            onPress={onPress}
            className="text-center text-2xl font-medium font-['Outfit'] leading-[46px] max-w-xs h-[56px]"
            radius="full"
            variant="flat"
            color="primary"
          >
            Подключиться
          </Button>
        </div>
      </CardBody>
      <CardBody className="flex lg:flex-1 overflow-visible items-center">
        <Image
          src={job}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
          alt="job"
        />
      </CardBody>
    </Card>
  );
}

export default ConnectPartnersHeader;
