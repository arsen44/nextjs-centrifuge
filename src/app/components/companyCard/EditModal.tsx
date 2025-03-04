import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Slider,
  Input,
  Button,
} from "@nextui-org/react";

const EditModal = ({
  isOpen,
  onClose,
  editField,
  editValue,
  setEditValue,
  localError,
  error,
  loading,
  onPress,
  company,
}) => {
  const fieldLabels = {
    contact_email: "Email",
    phone_number: "Телефон",
    address: "Адрес",
    commission: "Комиссия",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Изменить {fieldLabels[editField]}</ModalHeader>
        <ModalBody>
          {editField === "commission" ? (
            <>
              <Slider
                step={1}
                minValue={Math.max(1, parseInt(company.commission) - 10)}
                maxValue={Math.min(8, parseInt(company.commission) + 10)}
                value={editValue}
                onChange={setEditValue}
                className="max-w-md"
              />
              <p className="text-center mt-2">Текущее значение: {editValue}%</p>
            </>
          ) : (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              type={editField === "contact_email" ? "email" : "text"}
            />
          )}
          {(localError || error) && (
            <p className="text-red-500 mt-2">{localError || error}</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            Отмена
          </Button>
          <Button color="primary" onPress={onPress} isLoading={loading}>
            Сохранить
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
