"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardFooter,
  Input,
  Button,
  Divider,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Radio,
  RadioGroup,
  cn,
  RadioProps,
  Alert,
} from "@nextui-org/react";
import { connect } from "react-redux";
import { formatAmount } from "../../../../../helpers/math";
import CompanyDetails from "../../companyCard/CompanyDetails";
import { fetchPaymentCard } from "../../../../../store/actions/payment";
import { PAYMENT_CARDS_SAVE } from "../../../../../helpers/constants";
import { updateCompany } from "../../../../../store/actions/auth";
import { AddIcon } from "../../icons/AddIcon";
import { LeftIocn } from "../../icons/LeftIocn";
import { CradIcon } from "../../icons/CardIcon";
import axios from "axios";

interface CustomRadioProps extends RadioProps {
  children: React.ReactNode;
}

export const CustomRadio = (props: CustomRadioProps) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[400px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};

const About = ({ userData, fetchPaymentCard, paymentCards, updateCompany }) => {
  const [selectedMethod, setSelectedMethod] = useState(userData?.payment_method || "company_balance");
  const [displayCard, setDisplayCard] = useState(null);
  const { isOpen: isMethodOpen, onOpen: onMethodOpen, onClose: onMethodClose } = useDisclosure();
  const { isOpen: isCardOpen, onOpen: onCardOpen, onClose: onCardClose } = useDisclosure();
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentCard();
  }, []);

  useEffect(() => {
    if (paymentCards?.length > 0 && selectedMethod === "card") {
      setDisplayCard(paymentCards[0]);
    }
  }, [paymentCards, selectedMethod]);

  const handleMethodSelect = (value:string) => {
    if (value === "card" && !paymentCards?.length) {
      onCardOpen();
      onMethodClose();
    } else {
      setSelectedMethod(value);
      onMethodClose();
    }

    const updateData = { payment_method: value };
    updateCompany(updateData);
  };

  const handleAddCard = async () => {
    setLoading(true);
    try {
      const response = await axios.post(PAYMENT_CARDS_SAVE, {
        client_id: userData.id,
        amount: "11",
        card_number: cardNumber,
        expiry_month: expiration.slice(0, 2),
        expiry_year: "20" + expiration.slice(2, 4),
        cvc: cvv,
      });

      if (response.status === 200 || response.status === 201) {
        fetchPaymentCard();
        setSelectedMethod("card");
        onCardClose();
        ///toast.success("Карта успешно добавлена. Тестовый платеж будет возвращен.");
      }
    } catch (error) {
      ////toast.error("Ошибка при добавлении карты. Попробуйте позже.");
      console.error("Error:", error);
    }
    setLoading(false);
  };

  const renderPaymentInfo = () => {
    if (selectedMethod === "company_balance") {
      return (
        <>
          <CardFooter className="text-small justify-between mt-4">
            <b className="text-zinc-300 text-xl">Баланс</b>
            <h5 className="text-zinc-300 text-xl font-medium leading-normal">{formatAmount(userData.balance)}</h5>
          </CardFooter>
          <Divider className="my-4" />
          <CardFooter className="gap-2">
            <Input className="flex-grow" />
            <Button isIconOnly>
              <AddIcon />
            </Button>
          </CardFooter>
        </>
      );
    }

    return (
      <CardFooter className="text-small justify-between mt-4">
        <b className="text-zinc-300 text-xl">Карта</b>
        <h5 className="text-zinc-300 text-xl font-medium leading-normal">•••• {displayCard?.last4 || ""}</h5>
      </CardFooter>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-[30%] md:pr-4 mb-4 md:mb-0">
          <Card className="w-full">
            {renderPaymentInfo()}
            <Divider className="my-4" />
            <CardFooter>
              <Button
                startContent={<CradIcon />}
                endContent={<LeftIocn />}
                className="justify-between w-[100%]"
                variant="light"
                onPress={onMethodOpen}
              >
                Изменить способ оплаты
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full md:w-[70%] md:pl-4">
          <CompanyDetails />
        </div>

        <Modal isOpen={isMethodOpen} onClose={onMethodClose}>
          <ModalContent>
            <ModalHeader>Выберите способ оплаты</ModalHeader>
            <ModalBody>
              <RadioGroup value={selectedMethod} onValueChange={handleMethodSelect}>
                {userData?.company && <CustomRadio value="company_balance">Баланс компании</CustomRadio>}
                <CustomRadio value="card">
                  {paymentCards?.length > 0 ? (
                    <>
                      <div className="mt-4 p-2">
                        <span>•••• {displayCard?.last4}</span>
                        <span className="ml-2">
                          ({displayCard?.expiry_month}/{displayCard?.expiry_year})
                        </span>
                      </div>
                    </>
                  ) : (
                    "Добавить карту"
                  )}
                </CustomRadio>
              </RadioGroup>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Modal isOpen={isCardOpen} onClose={onCardClose}>
          <ModalContent>
            <ModalHeader>Добавить карту</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Номер карты"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
                <div className="flex gap-4">
                  <Input
                    label="MM/YY"
                    placeholder="MMYY"
                    value={expiration}
                    onChange={(e) => setExpiration(e.target.value)}
                    maxLength={4}
                  />
                  <Input
                    label="CVV"
                    type="password"
                    placeholder="000"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength={3}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onCardClose}>
                Отмена
              </Button>
              <Button color="primary" onPress={handleAddCard} isLoading={loading}>
                Сохранить
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
  paymentCards: state.payment.paymentCards,
});

const mapDispatchToProps = { fetchPaymentCard, updateCompany };

export default connect(mapStateToProps, mapDispatchToProps)(About);
