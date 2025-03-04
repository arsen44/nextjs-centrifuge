"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../../store/creatReducer";
import { fetchRefreshTokenRequest, fetchUserRequest } from "../../../../store/actions/auth";
import DeliveryCard from "./DeliveryCard";
import FooterApp from "./FooterApp";
import CardBusiness from "./CardBusiness";
import CardHead from "./CardHead";

// Массив с данными о типах доставки
const deliveryTypes = [
  {
    title: "Пеший",
    subtitle: "Курьер приедет за 10 минут и сразу отвезёт заказ получателю",
    image: "/images/DeliveryCuirer.png",
  },
  {
    title: "Экспресс-доставка",
    subtitle: "Курьер приедет за 10 минут и сразу отвезёт заказ получателю",
    image: "/images/DeliveryAuto.png",
  },
  {
    title: "Грузовая доставка",
    subtitle: "Срочная или по вашему графику",
    image: "/images/DeliveryTruck.png",
  },
];

function HomeHead({ token, isFetchingUser, fetchUserData, fetchRefreshToken }) {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  useEffect(() => {
    fetchRefreshToken();
  }, []);

  useEffect(() => {
    // Устанавливаем флаг готовности роутера
    setIsRouterReady(true);

    // Если токен есть, запрашиваем данные пользователя
    if (token) {
      fetchUserData();
    }
  }, [token, fetchUserData]);

  const handleCalculate = () => {
    if (!isRouterReady || isFetchingUser) return;

    if (!token) {
      // Перенаправление на страницу входа
      router.push("/login/");
      return;
    }

    router.push("/client/"); // Переход к странице клиента
  };

  if (!isRouterReady || isFetchingUser) return null; // Ожидаем готовности

  return (
    <div className="w-full flex flex-col m-20 items-center max-w-screen-2xl gap-10">
      <CardHead onPress={handleCalculate} />
      <CardBusiness />
      <div className="w-full flex flex-col justify-between items-center md:flex-row">
        {deliveryTypes.map((delivery, index) => (
          <DeliveryCard key={index} title={delivery.title} subtitle={delivery.subtitle} image={delivery.image} />
        ))}
      </div>
      <FooterApp />
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  token: state.auth.token,
  isFetchingUser: state.auth.isFetchingUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchUserData: () => dispatch(fetchUserRequest()),
  fetchRefreshToken: () => dispatch(fetchRefreshTokenRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeHead);
