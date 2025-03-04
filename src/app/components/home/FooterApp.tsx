import React from "react";
import { Card, Link, Image } from "@nextui-org/react";
import { Logo42 } from "../icons/Logo42";
import { Logo } from "../icons/logo";
import NextImage from "next/image";

export default function FooterApp() {
  return (
    <Card className="w-full md:h-[563px] flex  flex-col md:flex-row justify-between">
      <div className="flex  flex-col md:flex-row justify-between w-full md:m-8 m-0">
        <div className="flex flex-col items-start basis-1/2">
          <div className="flex flex-row items-center">
            <Logo42 />
            <Logo />
          </div>
          <div className="flex flex-col justify-between h-full md:ml-12 ml-5 mb-12">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-xl font-bold leading-normal">Заказывайте Доставку с телефона</h2>
              <p className="text-white text-lg font-medium leading-normal">
                Быстрая доставка в любое время и в любом месте.
              </p>
            </div>

            <div className="flex md:flex-row flex-col gap-6 items-center">
              <Image src="/images/mobileApp/appstore.png" width={230} height={56} alt="App Store" />
              <Link href="https://play.google.com/store/apps/details?id=com.roxo">
                <Image
                  as={NextImage}
                  src="/images/mobileApp/googleplay.png"
                  width={230}
                  height={56}
                  alt="Google Play"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center basis-1/2">
          <Image
            as={NextImage}
            src="/images/screenshot-roxo-app.png"
            width={279}
            height={462}
            alt="screenshot-roxo-app"
          />
        </div>
      </div>
    </Card>
  );
}
