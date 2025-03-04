"use client";
import React, { useRef, useState } from "react";
import ConnectPartnersHeader from "./ConnectPartnersHeader";
import ConnectContent from "./ConnectContent";
import ContactForm from "./ContactForm";

function HomeConnect({ onPress }) {
  const formRef = useRef(null);

  const handleConnect = () => {
    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  return (
    <div className="flex w-full flex-col m-20 items-center max-w-screen-2xl gap-10">
      <ConnectPartnersHeader onPress={handleConnect} />
      <ConnectContent />

      <div ref={formRef} className="mb-12 w-full">
        <ContactForm />
      </div>
    </div>
  );
}

export default HomeConnect;
