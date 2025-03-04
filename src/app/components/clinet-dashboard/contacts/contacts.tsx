import React from "react";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";

const Contacts = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Контакты</h1>
          </div>
        </CardHeader>
        <CardBody>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              {/* <PhoneIcon className="text-primary" /> */}
              <div>
                <p className="font-semibold">Телефон</p>
                <p>+7 (999) 123-45-67</p>
                <p>+7 (495) 987-65-43</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* <MailIcon className="text-primary" /> */}
              <div>
                <p className="font-semibold">Email</p>
                <p>info@companyname.ru</p>
                <p>support@companyname.ru</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* <MapPinIcon className="text-primary" /> */}
              <div>
                <p className="font-semibold">Адрес</p>
                <p>г. Москва, ул. Примерная, д. 123, офис 456</p>
              </div>
            </div>

            <div className="mt-4">
              <Button color="primary" variant="solid" className="w-full">
                Написать нам
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Contacts;
