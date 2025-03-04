import React from "react";
import NavbarCompanents from "../components/navbar/navbar";
import HomeConnect from "../components/connect-partners/HomeConnect";

export default function Home() {
  return (
    <div className="flex w-full h-screen items-center flex-col">
      <NavbarCompanents />
      <HomeConnect />
    </div>
  );
}
