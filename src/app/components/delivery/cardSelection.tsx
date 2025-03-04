"use client";
import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedCard } from "../../../../store/actions/selectCard";
import { updateDeliveryvariant, updateVaration } from "../../../../store/actions/orderActions";
import { formatAmount } from "../../../../helpers/math";
import { Media_Faile } from "../../../../helpers/constants";
import { Image, Card, CardHeader } from "@nextui-org/react";

const CardItem = ({ price, setSelectedCard, selectedCard, setIndex }) => {
  const dispatch = useDispatch();
  const isSelected = selectedCard?.id === price.id;

  const handleCardPress = useCallback(
    (cardId, cardPriceName, cardPrice, variations) => {
      setSelectedCard(cardId, cardPriceName, cardPrice, variations);
      dispatch(updateDeliveryvariant({ deliveryvariant: cardPriceName }));
      dispatch(updateVaration({ variation: null }));
    },
    [dispatch, setSelectedCard, setIndex]
  );

  return (
    <Card
      onPress={() => handleCardPress(price.id, price.name, price.price, price.variationPrice)}
      isPressable
      className={`flex flex-col w-[140px] h-[72px] rounded-lg transition-all duration-300 ease-in-out ${
        isSelected ? "bg-[#01FFFF]/50 scale-105" : "hover:bg-[#01FFFF]/20"
      }`}
    >
      <CardHeader className="justify-between">
        <Image src={Media_Faile + price.MediaContent} alt={price.name} height={52} width={56} isBlurred />
        <div className="text-center flex flex-col gap-1">
          <h3 className="text-sm font-medium">{price.name}</h3>
          <p className="text-xs">{formatAmount(price.price)} ₽</p>
        </div>
      </CardHeader>
    </Card>
  );
};

const CardSelection = () => {
  const dispatch = useDispatch();
  const routeData = useSelector((state) => state.address.routeData);
  const selectedCard = useSelector((state) => state.selectedCard.selectedCard);

  return (
    <div className="p-4">
      {routeData &&
        routeData.coordinates.map((item, idx) => (
          <div key={idx} className="flex overflow-none space-x-4 gap-5">
            {item.price.map((price) => (
              <CardItem
                key={price.id}
                price={price}
                setSelectedCard={(cardId, name, prices, variations) =>
                  dispatch(setSelectedCard(cardId, name, prices, variations))
                }
                selectedCard={selectedCard}
              />
            ))}
          </div>
        ))}
    </div>
  );
};

export default CardSelection;
