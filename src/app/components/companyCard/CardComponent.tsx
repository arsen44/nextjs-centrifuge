import React, { useState } from "react";
import { Card, CardHeader, CardBody, Button, cn } from "@nextui-org/react";
import { EditIcon } from "../icons/EditIcon";

export const IconWrapper = ({ children, className }) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>{children}</div>
);

const CardComponent = ({ header, company, onEdit }) => {
  const [previousCommission, setPreviousCommission] = useState(null);
  const isPartner = company?.role === "Company/Park";

  const handleCommissionEdit = (field, value) => {
    setPreviousCommission(parseFloat(value));
    onEdit(field, value);
  };

  const calculateCommissionChange = (currentValue) => {
    if (previousCommission === null) return null;
    const current = parseFloat(currentValue);
    const difference = current - previousCommission;
    const sign = difference > 0 ? "+" : "";
    return `${sign}${difference.toFixed(2)}%`;
  };

  const renderValue = (item) => {
    if (item.field === "commission") {
      const change = calculateCommissionChange(item.value);
      return (
        <div className="flex items-center gap-2">
          <span>{item.value}%</span>
          {change && (
            <span className={`text-sm ${change.startsWith("+") ? "text-green-500" : "text-red-500"}`}>({change})</span>
          )}
        </div>
      );
    }
    return item.value || "-";
  };

  // Создаем поля только если company существует
  const fields = company ? [
    { label: "Название", value: company.name },
    {
      label: "Email",
      value: company.contact_email,
      editable: true,
      field: "contact_email",
    },
    {
      label: "Телефон",
      value: company.phone_number,
      editable: true,
      field: "phone_number",
    },
    {
      label: "Адрес",
      value: company.address,
      editable: true,
      field: "address",
    },
  ] : [];

  // Добавляем поле комиссии только для партнеров
  if (isPartner) {
    fields.push({
      label: "Комиссия",
      value: company.commission,
      editable: true,
      field: "commission",
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-lg">{header}</h2>
      </CardHeader>
      <CardBody>
        {company ? (
          <div className="space-y-4">
            {fields.map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <div className="flex-grow">
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <div className="flex items-center gap-2">{renderValue(item)}</div>
                </div>
                {item.editable && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() =>
                      item.field === "commission"
                        ? handleCommissionEdit(item.field, item.value)
                        : onEdit(item.field, item.value)
                    }
                  >
                    <IconWrapper className="bg-success/10">
                      <EditIcon size={18} />
                    </IconWrapper>
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Нет данных о компании</p>
        )}
      </CardBody>
    </Card>
  );
};

export default CardComponent;
