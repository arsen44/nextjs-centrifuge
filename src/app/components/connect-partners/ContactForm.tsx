import React, { useState } from "react";
import { Input, Button, Alert } from "@nextui-org/react";
import { CONNECT_PARTNER_SUMBIT_API } from "../../../../helpers/constants";
import axios from "axios";

function PushAlert({ title, description }) {
  return (
    <div className="flex items-start w-max-300 absolute">
      <Alert description={description} title={title} color="success" variant="flat" />
    </div>
  );
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    park_name: "",
    phone: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ title: "", description: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        CONNECT_PARTNER_SUMBIT_API, // URL API
        formData // Данные для отправки
      );

      if (response.status === 200) {
        // Проверяем статус ответа
        setAlertMessage({
          title: "Сообщение отправлено успешно!",
          description: "Мы свяжемся с вами в ближайшее время.",
        });
        setShowAlert(true);
        setFormData({ country: "", city: "", park_name: "", phone: "" }); // Сброс формы
      }
    } catch (error) {
      setAlertMessage({
        title: "Ошибка",
        description: "Произошла ошибка при отправке формы.",
      });
      setShowAlert(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-10 items-center justify-center">
        <span className="text-wrap text-center text-white text-4xl font-semibold font-['Outfit'] leading-[35px]">
          Отправить заявку
        </span>
      </div>
      <div className="m-4 flex h-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[400px]">
          <Input
            name="country"
            label="Страна"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            required
            variant="faded"
          />
          <Input
            name="city"
            label="Город"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            variant="faded"
          />
          <Input
            name="park_name"
            label="Название парка"
            value={formData.park_name}
            onChange={(e) => setFormData({ ...formData, park_name: e.target.value })}
            required
            variant="faded"
          />
          <Input
            name="phone"
            label="Телефон"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            type="tel"
            required
            variant="faded"
          />
          <Button type="submit" color="primary" className="w-full h-[50px]" variant="flat">
            Отправить
          </Button>
        </form>
      </div>
      {showAlert && <PushAlert title={alertMessage.title} description={alertMessage.description} />}
    </div>
  );
}
