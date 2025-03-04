"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateVaration, updateAmount, updateLoader } from "../../../../store/actions/orderActions";
import { Card } from "@nextui-org/react";

const VariationCard = ({ item, isSelected, onPress }) => (
  <Card
    onPress={onPress}
    isPressable
    className={`w-[200px] h-[50px] bg-[#242424]/60 rounded-lg shadow transition-all duration-300 ease-in-out ${
      isSelected ? "bg-[#01FFFF]/50 scale-105" : "hover:bg-[#01FFFF]/20"
    }`}
  >
    <div className="flex items-start">
      <div className="ml-4">
        <h3 className="text-white text-start text-[12px] font-normal">{item.VariationName}</h3>
        <p className="text-[#999999] text-start text-[12px] font-normal">{item.Description}</p>
      </div>
    </div>
  </Card>
);

const TripDetails = () => {
  const dispatch = useDispatch();
  const selectedCard = useSelector((state) => state.selectedCard.selectedCard);
  const orders = useSelector((state) => state.order.orders);

  const [selectedCargoType, setSelectedCargoType] = useState(null);
  const [selectedLoader, setSelectedLoader] = useState(null);

  const handleVariationSelection = useCallback(
    (selectedSubVariant) => {
      const finalAmount = selectedCard.price * (1 + selectedSubVariant.PriceValue);
      dispatch(updateVaration({ variation: selectedSubVariant }));
      dispatch(updateAmount({ amount: finalAmount }));
    },
    [selectedCard, dispatch]
  );

  const calculateFinalAmount = useMemo(
    () => (cardPrice, selectedCargoType, selectedLoader) => {
      let finalAmount = cardPrice;

      if (selectedCargoType) {
        finalAmount += cardPrice * selectedCargoType.PriceValue;
      }

      if (selectedLoader) {
        finalAmount += cardPrice * selectedLoader.PriceValue;
      }

      return Math.ceil(finalAmount * 100) / 100;
    },
    []
  );

  const handleCargoTypeSelection = useCallback(
    (selectedSubVariant) => {
      setSelectedCargoType(selectedSubVariant);
      const finalAmount = calculateFinalAmount(selectedCard.price, selectedSubVariant, selectedLoader);
      dispatch(updateVaration({ variation: selectedSubVariant }));
      dispatch(updateAmount({ amount: finalAmount }));
    },
    [selectedCard, selectedLoader, dispatch, calculateFinalAmount]
  );

  const handleLoaderSelection = useCallback(
    (selectedSubVariant) => {
      setSelectedLoader(selectedSubVariant);
      const finalAmount = calculateFinalAmount(selectedCard.price, selectedCargoType, selectedSubVariant);
      dispatch(updateLoader({ loader: selectedSubVariant }));
      dispatch(updateAmount({ amount: finalAmount }));
    },
    [selectedCard, selectedCargoType, dispatch, calculateFinalAmount]
  );

  const isCargo = selectedCard.name === "Грузовой";

  const cargoTypes = useMemo(
    () => selectedCard.variations.filter((variation) => variation.Title === "Тип кузовова"),
    [selectedCard.variations]
  );

  const loaders = useMemo(
    () => selectedCard.variations.filter((variation) => variation.Title === "Грузчики"),
    [selectedCard.variations]
  );

  useEffect(() => {
    if (selectedCard.name === "Грузовой") {
      const defaultLoader = selectedCard.variations.find(
        (item) => item.Title === "Грузчики" && item.VariationName === "Помощь не нужно"
      );
      if (defaultLoader) {
        handleLoaderSelection(defaultLoader);
      }
    }
  }, [selectedCard, handleLoaderSelection]);

  return (
    <>
      {orders && selectedCard.variations && selectedCard.variations.length > 0 && (
        <div className="ml-4 flex flex-row justify-between">
          {isCargo ? (
            <div className="">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">Тип кузова</h2>
                <div className="flex flex-row gap-5">
                  {cargoTypes.map((item) => (
                    <VariationCard
                      key={item.ID}
                      item={item}
                      isSelected={selectedCargoType && selectedCargoType.ID === item.ID}
                      onPress={() => handleCargoTypeSelection(item)}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold">Грузчики</h2>
                <div className="flex felx-row gap-5">
                  {loaders.map((item) => (
                    <VariationCard
                      key={item.ID}
                      item={item}
                      isSelected={selectedLoader && selectedLoader.ID === item.ID}
                      onPress={() => handleLoaderSelection(item)}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold">Вес посылки</h2>
              <div className="flex flex-row gap-5">
                {selectedCard.variations.map((item) => (
                  <VariationCard
                    key={item.ID}
                    item={item}
                    isSelected={orders.variation.variation && orders.variation.variation.ID === item.ID}
                    onPress={() => handleVariationSelection(item)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TripDetails;
