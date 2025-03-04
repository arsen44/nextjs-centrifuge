"use client";
import React from "react";
import { Navbar, useDisclosure } from "@nextui-org/react";
import ClientDrawer from "../drawer/drawer";
import { connect } from "react-redux";

function NavBar({ username }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <Navbar className="max-w-max">
      <ClientDrawer isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} onPress={handleOpen} name={username} />
      <p className="font-bold text-inherit">{username}</p>
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  username: state.auth.userData.username,
});

const mapDispatchToProps = (dispatch) => ({
  setSelectedCard: (cardId, prices) => dispatch(setSelectedCard(cardId, prices)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
