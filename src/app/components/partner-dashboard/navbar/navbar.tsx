import { Navbar, useDisclosure } from "@nextui-org/react";
import React from "react";

import PartnerDrawer from "../drawer/drawer";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <PartnerDrawer isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onPress={handleOpen} />
      </Navbar>
      {children}
    </div>
  );
};
