"use client";
import React, { useEffect } from "react";
import { Button, Card, Input } from "@nextui-org/react";
import { connect } from "react-redux";
import DeliveryDetails from "../../delivery/deliveryDetalis";
import CardSelection from "../../delivery/cardSelection";
import AddressForm from "../../autocomplete/addressForm";
import { useFormik } from "formik";
import { setSelectedCard } from "../../../../../store/actions/selectCard";
import {
  updatePickupFlatNumber,
  updatePickupPhoneNumber,
  updatePickupEntranceNumber,
  updatePickupIntercomNumber,
  updatePickupFloorNumber,
  updatePickupClientComment,
  updateDropoffFlatNumber,
  updateDropoffPhoneNumber,
  updateDropoffEntranceNumber,
  updateDropoffIntercomNumber,
  updateDropoffFloorNumber,
  updateDropoffClientComment,
  updatePickupAddress,
  updateDropoffAddress,
  updateClient,
} from "../../../../../store/actions/orderActions";
import { fetchUserRequest } from "../../../../../store/actions/auth";
import { CREATE_TRIP_API } from "../../../../../helpers/constants";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import useWebSocket from "../../../../../hook/useWebSocket";
import { formatAmount } from "../../../../../helpers/math";

const Map = dynamic(() => import("../../map/map"), {
  loading: () => "Loading...",
  ssr: true,
});

function ClientHome({
  selectedCard,
  setSelectedCard,
  handleVariationSelect,
  startAddress,
  endAddress,
  phone_number,
  userID,
  order,
  pickupaddress_flatNumber,
  pickupaddress_phoneNumber,
  pickupaddress_entranceNumber,
  pickupaddress_intercomNumber,
  pickupaddress_floorNumber,
  pickupaddress_clientComment,
  dropoffaddress_flatNumber,
  dropoffaddress_phoneNumber,
  dropoffaddress_entranceNumber,
  dropoffaddress_intercomNumber,
  dropoffaddress_floorNumber,
  dropoffaddress_clientComment,
  updatePickupPhoneNumber,
  updatePickupAddress,
  updateDropoffAddress,
  updateClient,
  updateInputValues,
  fetchUserData,
  amount,
}) {
  const { sendMessage } = useWebSocket(userID);


  useEffect(() => {
    if (phone_number && startAddress && endAddress && userID) {
      updatePickupPhoneNumber(phone_number);
      updatePickupAddress(startAddress);
      updateDropoffAddress(endAddress);
      updateClient(userID);
    }
  }, [phone_number, startAddress, endAddress, userID]);

  const formik = useFormik({
    initialValues: {
      //  pickup
      pickupPhoneNumber: pickupaddress_phoneNumber || phone_number,
      pickupFlatNumber: pickupaddress_flatNumber || "",
      pickupEntranceNumber: pickupaddress_entranceNumber || "",
      pickupIntercomNumber: pickupaddress_intercomNumber || "",
      pickupFloorNumber: pickupaddress_floorNumber || "",
      pickupClientComment: pickupaddress_clientComment || "",
      // dropoff
      dropoffPhoneNumber: dropoffaddress_phoneNumber || phone_number,
      dropoffFlatNumber: dropoffaddress_flatNumber || "",
      dropoffEntranceNumber: dropoffaddress_entranceNumber || "",
      dropoffIntercomNumber: dropoffaddress_intercomNumber || "",
      dropoffFloorNumber: dropoffaddress_floorNumber || "",
      dropoffClientComment: dropoffaddress_clientComment || "",
    },
    validationSchema: Yup.object({
      pickupPhoneNumber: Yup.string().required("Required"),
      dropoffPhoneNumber: Yup.string().required("Required"),
    }),

    onSubmit: async (values) => {
      const pickupAddress = {
        phone_number: values.pickupPhoneNumber,
        address_name: startAddress?.label,
        location: {
          lat: startAddress?.coordinates[1],
          lon: startAddress?.coordinates[0],
        },
        flat_number: values.pickupFlatNumber,
        entrance_number: values.pickupEntranceNumber,
        floor_number: values.pickupFloorNumber,
        intercom_number: values.pickupIntercomNumber,
        client_comment: values.pickupClientComment,
      };

      const dropoffAddress = {
        phone_number: values.dropoffPhoneNumber,
        address_name: endAddress?.label,
        location: {
          lat: endAddress?.coordinates[1],
          lon: endAddress?.coordinates[0],
        },
        flat_number: values.dropoffFlatNumber,
        entrance_number: values.dropoffEntranceNumber,
        floor_number: values.dropoffFloorNumber,
        intercom_number: values.dropoffIntercomNumber,
        client_comment: values.dropoffClientComment,
      };

      const variationIdData = order?.orders?.variation?.variation || {};

      const requestData = {
        ID: uuidv4(),
        pick_up_address: pickupAddress,
        drop_off_address: dropoffAddress,
        deliveryvariant: order?.orders?.deliveryvariant?.deliveryvariant,
        variation: variationIdData,
        client_id: userID.toString(),
        amount: order?.orders?.amount?.amount,
        status: "REQUESTED",
      };

      if (requestData.deliveryvariant === "Грузовой") {
        requestData.loader = order?.orders?.loader?.loader || {};
      }

      try {
        const response = await axios.post(CREATE_TRIP_API, requestData);
        console.log("Order created with ID:", response.data.orderId);
      } catch (error) {
        console.error("Error submitting order:", error);
      }
    },
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <div className="absolute top-16 left-0 z-10 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="max-h-[calc(100vh-6rem)] overflow-y-scroll pb-4 no-scrollbar h-[100%]">
          <div className="flex flex-col gap-2">
            <Card className="w-full md:w-[800px] mx-auto shadow-lg mt-4" radius="lg">
              <div className="p-4">
                <CardSelection selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
              </div>
              <div className="p-4">
                <DeliveryDetails handleVariationSelect={handleVariationSelect} />
              </div>
            </Card>

            <Card className="w-full md:w-[800px] mx-auto shadow-md" radius="lg">
              <div className="p-4">
                <div className="flex flex-row gap-20">
                  <span>Откуда</span>
                  <div className="flex flex-col gap-2">
                    <AddressForm type="pickup" initialAddress={startAddress} />
                    <div className="flex flex-row gap-5">
                      <Input
                        name="pickupEntranceNumber"
                        label="Подъезд"
                        variant="underlined"
                        size="lg"
                        value={formik.values.pickupEntranceNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="pickupIntercomNumber"
                        label="Домофон"
                        variant="underlined"
                        size="lg"
                        value={formik.values.pickupIntercomNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="pickupFloorNumber"
                        label="Этаж"
                        variant="underlined"
                        size="lg"
                        value={formik.values.pickupFloorNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="pickupFlatNumber"
                        label="Квартира"
                        variant="underlined"
                        size="lg"
                        value={formik.values.pickupFlatNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                    </div>
                    <Input
                      name="pickupClientComment"
                      label="Комментарий для курьера"
                      variant="underlined"
                      size="lg"
                      value={formik.values.pickupClientComment}
                      onChange={(e) => {
                        formik.handleChange(e);
                        updateInputValues(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10 mb-3">
                  <span>Отправитель</span>
                  <Input
                    name="pickupPhoneNumber"
                    label="Номер телефона"
                    variant="underlined"
                    size="lg"
                    value={formik.values.pickupPhoneNumber}
                    onChange={(e) => {
                      formik.handleChange(e);
                      updateInputValues(e.target.name, e.target.value);
                    }}
                  />
                </div>
              </div>
            </Card>

            <Card className="w-full md:w-[800px] mx-auto  shadow-md" radius="lg">
              <div className="p-4">
                <div className="flex flex-row gap-20">
                  <span>Куда</span>
                  <div className="flex flex-col gap-2">
                    <AddressForm type="dropoff" initialAddress={endAddress} />
                    <div className="flex flex-row gap-5">
                      <Input
                        name="dropoffEntranceNumber"
                        label="Подъезд"
                        variant="underlined"
                        size="lg"
                        value={formik.values.dropoffEntranceNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="dropoffIntercomNumber"
                        label="Домофон"
                        variant="underlined"
                        size="lg"
                        value={formik.values.dropoffIntercomNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="dropoffFloorNumber"
                        label="Этаж"
                        variant="underlined"
                        size="lg"
                        value={formik.values.dropoffFloorNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                      <Input
                        name="dropoffFlatNumber"
                        label="Квартира"
                        variant="underlined"
                        size="lg"
                        value={formik.values.dropoffFlatNumber}
                        onChange={(e) => {
                          formik.handleChange(e);
                          updateInputValues(e.target.name, e.target.value);
                        }}
                      />
                    </div>
                    <Input
                      name="dropoffClientComment"
                      label="Комментарий для курьера"
                      variant="underlined"
                      size="lg"
                      value={formik.values.dropoffClientComment}
                      onChange={(e) => {
                        formik.handleChange(e);
                        updateInputValues(e.target.name, e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row gap-10 mb-3">
                  <span>Получатель</span>
                  <Input
                    name="dropoffPhoneNumber"
                    label="Номер телефона"
                    variant="underlined"
                    size="lg"
                    value={formik.values.dropoffPhoneNumber}
                    onChange={(e) => {
                      formik.handleChange(e);
                      updateInputValues(e.target.name, e.target.value);
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
        <Card className="justify-center items-center h-[56px] bottom-9">
          <Button
            className="text-xl text-white bg-black/20 h-full shadow-[0px_4px_65.80000305175781px_0px_rgba(188,188,188,0.25)] border border-[#3f3e3e]"
            radius="lg"
            fullWidth
            onPress={() => formik.handleSubmit()}
            disableRipple
          >
            <span className="ml-2">{formatAmount(amount?.amount)} ₽</span>
            <span className="flex-grow text-center mr-10">Заказать</span>
          </Button>
        </Card>
      </div>

      <Map />
    </>
  );
}

const mapStateToProps = (state) => ({
  startAddress: state.address.startAddress,
  endAddress: state.address.endAddress,
  selectedCard: state.selectedCard.selectedCard,
  routeData: state.address.routeData,
  variation: state.order.orders?.variation.variation,
  pickupaddress_flatNumber: state.order.orders.pickupaddress_flatNumber,
  pickupaddress_phoneNumber: state.order.orders.pickupaddress_phoneNumber,
  pickupaddress_entranceNumber: state.order.orders.pickupaddress_entranceNumber,
  pickupaddress_intercomNumber: state.order.orders.pickupaddress_intercomNumber,
  pickupaddress_floorNumber: state.order.orders.pickupaddress_floorNumber,
  pickupaddress_clientComment: state.order.orders.pickupaddress_clientComment,
  dropoffaddress_flatNumber: state.order.orders.dropoffaddress_flatNumber,
  dropoffaddress_phoneNumber: state.order.orders.dropoffaddress_phoneNumber,
  dropoffaddress_entranceNumber: state.order.orders.dropoffaddress_entranceNumber,
  dropoffaddress_intercomNumber: state.order.orders.dropoffaddress_intercomNumber,
  dropoffaddress_floorNumber: state.order.orders.dropoffaddress_floorNumber,
  dropoffaddress_clientComment: state.order.orders.dropoffaddress_clientComment,
  client: state.order.orders.client,
  amount: state.order.orders.amount,
  phone_number: state.auth.userData.phone_number,
  order: state.order,
  userID: state.auth.userData.id,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedCard: (cardId, prices) => dispatch(setSelectedCard(cardId, prices)),
  fetchUserData: () => dispatch(fetchUserRequest()),
  updateInputValues: (field, value) => {
    switch (field) {
      // Pickup actions
      case "pickupPhoneNumber":
        dispatch(updatePickupPhoneNumber(value));
        break;
      case "pickupEntranceNumber":
        dispatch(updatePickupEntranceNumber(value));
        break;
      case "pickupIntercomNumber":
        dispatch(updatePickupIntercomNumber(value));
        break;
      case "pickupFloorNumber":
        dispatch(updatePickupFloorNumber(value));
        break;
      case "pickupFlatNumber":
        dispatch(updatePickupFlatNumber(value));
        break;
      case "pickupClientComment":
        dispatch(updatePickupClientComment(value));
        break;
      case "pickupPhoneNumber":
        dispatch(updatePickupPhoneNumber(value));
        break;
      // Dropoff actions
      case "dropoffPhoneNumber":
        dispatch(updateDropoffPhoneNumber(value));
        break;
      case "dropoffEntranceNumber":
        dispatch(updateDropoffEntranceNumber(value));
        break;
      case "dropoffIntercomNumber":
        dispatch(updateDropoffIntercomNumber(value));
        break;
      case "dropoffFloorNumber":
        dispatch(updateDropoffFloorNumber(value));
        break;
      case "dropoffFlatNumber":
        dispatch(updateDropoffFlatNumber(value));
        break;
      case "dropoffClientComment":
        dispatch(updateDropoffClientComment(value));
        break;
      case "dropoffPhoneNumber":
        dispatch(updateDropoffPhoneNumber(value));
        break;

      default:
        break;
    }
  },
  updatePickupClientComment,
  updatePickupFlatNumber,
  updatePickupEntranceNumber,
  updatePickupIntercomNumber,
  updatePickupFloorNumber,
  updatePickupPhoneNumber,
  updateDropoffClientComment,
  updateDropoffFlatNumber,
  updateDropoffEntranceNumber,
  updateDropoffIntercomNumber,
  updateDropoffFloorNumber,
  updateDropoffPhoneNumber,
  updatePickupAddress,
  updateDropoffAddress,
  updateClient,
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientHome);
