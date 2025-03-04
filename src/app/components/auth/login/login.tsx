"use client";
import React, { useState } from "react";
import { connect } from "react-redux";
import { authLogin } from "../../../../../store/actions/auth";
import { RootState, AppDispatch } from "../../../../../store/creatReducer";
import PhoneInput, { isPossiblePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  CardFooter,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface LoginScreenProps {
  login: (phoneNumber: string) => void;
  loading: boolean;
  error: string | null;
}

export const RoxoLogo = () => {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="60" rx="12" fill="black" />
      <path
        d="M12.0909 43V16.8182H19.7614C21.2273 16.8182 22.5227 17.1293 23.6477 17.7514C24.7813 18.3736 25.6676 19.2429 26.3068 20.3594C26.9545 21.4759 27.2784 22.7841 27.2784 24.2841C27.2784 25.767 26.9545 27.0668 26.3068 28.1832C25.6676 29.2912 24.7813 30.1562 23.6477 30.7784C22.5227 31.392 21.2273 31.6989 19.7614 31.6989H12.5V30.8807H19.7614C21.0739 30.8807 22.233 30.608 23.2386 30.0625C24.2443 29.517 25.0327 28.75 25.6037 27.7614C26.1747 26.7727 26.4602 25.6136 26.4602 24.2841C26.4602 22.946 26.1747 21.7784 25.6037 20.7812C25.0327 19.7841 24.2443 19.0128 23.2386 18.4673C22.233 17.9134 21.0739 17.6364 19.7614 17.6364H12.9091V43H12.0909ZM22.0625 31.0852L28.5057 43H27.5852L21.142 31.0852H22.0625ZM32.3984 16.8182L40.6314 29.142H40.7337L48.9666 16.8182H49.9893L41.1939 29.9091L49.9893 43H48.9666L40.7337 30.6761H40.6314L32.3984 43H31.3757L40.1712 29.9091L31.3757 16.8182H32.3984Z"
        fill="white"
      />
    </svg>
  );
};

export const RoxoLogoText = () => {
  return (
    <svg width="87" height="38" viewBox="0 0 87 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_33_13)">
        <path
          d="M5.78409 28V1.81818H13.8509C15.5043 1.81818 16.9276 2.14204 18.1207 2.78977C19.3139 3.4375 20.2301 4.33665 20.8693 5.48722C21.5085 6.62926 21.8281 7.95881 21.8281 9.47585C21.8281 10.9759 21.5085 12.2969 20.8693 13.4389C20.2301 14.5724 19.3139 15.4588 18.1207 16.098C16.9361 16.7372 15.517 17.0568 13.8636 17.0568H6.64062V15.5611H13.8253C15.1719 15.5611 16.3224 15.3097 17.277 14.8068C18.2315 14.304 18.9645 13.6009 19.4759 12.6974C19.9872 11.7855 20.2429 10.7116 20.2429 9.47585C20.2429 8.23153 19.9872 7.14915 19.4759 6.22869C18.9645 5.29971 18.2273 4.57954 17.2642 4.06818C16.3097 3.55682 15.1591 3.30114 13.8125 3.30114H7.3821V28H5.78409ZM16.5355 16.1364L22.9787 28H21.1378L14.733 16.1364H16.5355ZM34.7528 28.4091C33.1335 28.4091 31.6932 27.9744 30.4318 27.1051C29.1705 26.2273 28.1776 25.0213 27.4531 23.4872C26.7287 21.9531 26.3665 20.206 26.3665 18.2457C26.3665 16.277 26.7287 14.5298 27.4531 13.0043C28.1776 11.4702 29.1705 10.2642 30.4318 9.38636C31.6932 8.50852 33.1335 8.0696 34.7528 8.0696C36.3722 8.0696 37.8125 8.50852 39.0739 9.38636C40.3352 10.2642 41.3281 11.4702 42.0526 13.0043C42.777 14.5384 43.1392 16.2855 43.1392 18.2457C43.1392 20.206 42.777 21.9531 42.0526 23.4872C41.3281 25.0213 40.3352 26.2273 39.0739 27.1051C37.8125 27.9744 36.3722 28.4091 34.7528 28.4091ZM34.7528 26.9645C36.125 26.9645 37.3224 26.5767 38.3452 25.8011C39.3764 25.0256 40.1733 23.9773 40.7358 22.6562C41.3068 21.3352 41.5923 19.8651 41.5923 18.2457C41.5923 16.6264 41.3068 15.1605 40.7358 13.848C40.1648 12.527 39.3679 11.4787 38.3452 10.7031C37.3224 9.91903 36.125 9.52699 34.7528 9.52699C33.3807 9.52699 32.1832 9.91903 31.1605 10.7031C30.1378 11.4787 29.3409 12.527 28.7699 13.848C28.1989 15.1605 27.9134 16.6264 27.9134 18.2457C27.9134 19.8651 28.1946 21.3352 28.7571 22.6562C29.3281 23.9773 30.125 25.0256 31.1477 25.8011C32.179 26.5767 33.3807 26.9645 34.7528 26.9645ZM48.2912 8.36364L53.7116 17.0952L59.1321 8.36364H60.9347L54.6449 18.1818L60.9347 28H59.1321L53.7116 19.4091L48.2912 28H46.4759L52.7401 18.1818L46.4759 8.36364H48.2912ZM72.6513 28.4091C71.032 28.4091 69.5916 27.9744 68.3303 27.1051C67.0689 26.2273 66.076 25.0213 65.3516 23.4872C64.6271 21.9531 64.2649 20.206 64.2649 18.2457C64.2649 16.277 64.6271 14.5298 65.3516 13.0043C66.076 11.4702 67.0689 10.2642 68.3303 9.38636C69.5916 8.50852 71.032 8.0696 72.6513 8.0696C74.2706 8.0696 75.7109 8.50852 76.9723 9.38636C78.2337 10.2642 79.2266 11.4702 79.951 13.0043C80.6754 14.5384 81.0376 16.2855 81.0376 18.2457C81.0376 20.206 80.6754 21.9531 79.951 23.4872C79.2266 25.0213 78.2337 26.2273 76.9723 27.1051C75.7109 27.9744 74.2706 28.4091 72.6513 28.4091ZM72.6513 26.9645C74.0234 26.9645 75.2209 26.5767 76.2436 25.8011C77.2749 25.0256 78.0717 23.9773 78.6342 22.6562C79.2053 21.3352 79.4908 19.8651 79.4908 18.2457C79.4908 16.6264 79.2053 15.1605 78.6342 13.848C78.0632 12.527 77.2663 11.4787 76.2436 10.7031C75.2209 9.91903 74.0234 9.52699 72.6513 9.52699C71.2791 9.52699 70.0817 9.91903 69.0589 10.7031C68.0362 11.4787 67.2393 12.527 66.6683 13.848C66.0973 15.1605 65.8118 16.6264 65.8118 18.2457C65.8118 19.8651 66.093 21.3352 66.6555 22.6562C67.2266 23.9773 68.0234 25.0256 69.0462 25.8011C70.0774 26.5767 71.2791 26.9645 72.6513 26.9645Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_33_13"
          x="0.484057"
          y="0.518176"
          width="85.8535"
          height="37.1909"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2.65" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.991667 0 0 0 0 1 0 0 0 0 0.999028 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_33_13" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_33_13" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

const LoginScreen = ({ login }: LoginScreenProps) => {
  const [phone, setPhone] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    // Проверяем валидность номера телефона
    if (!phone) {
      setErrorMessage("Введите номер телефона");
      onOpen();
      return;
    }

    if (!isPossiblePhoneNumber(phone)) {
      setErrorMessage("Некорректный формат номера");
      onOpen();
      return;
    }

    if (!isValidPhoneNumber(phone)) {
      setErrorMessage("Введите корректный номер телефона");
      onOpen();
      return;
    }

    // Отправляем код подтверждения
    login(phone);
    router.push("/verification_code");
  };

  return (
    <>
      <Card className="max-w-[400px] h-[450px] mx-auto">
        <CardHeader className="flex gap-3">
          <RoxoLogo />
          <RoxoLogoText />
        </CardHeader>
        <Divider />
        <CardBody className="mt-2">
          <h2 className="text-white text-xl font-normal leading-[29px] text-center">
            Введите ваш номер телефона для получения кода
          </h2>
        </CardBody>
        <CardBody>
          <PhoneInput
            className="w-full"
            international
            defaultCountry="RU"
            placeholder="Ваш телефон"
            value={phone}
            onChange={setPhone}
            numberInputProps={{
              className: "w-full p-3 border-1 border-none rounded-lg",
            }}
          />
        </CardBody>
        <Divider />
        <CardFooter className="mt-2">
          <Button color="primary" variant="shadow" onPress={handleSubmit} className="w-[400px] text-xl">
            Вход
          </Button>
        </CardFooter>
      </Card>

      {/* Модальное окно для ошибок */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Ошибка</ModalHeader>
              <ModalBody>
                <p>{errorMessage}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Закрыть
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    login: (phone_number: string) => dispatch(authLogin(phone_number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
