import React from "react";
import HomeHead from "./components/home/HomeHead";
import NavbarCompanents from "./components/navbar/navbar";

function Home() {
  return (
    <div className="flex w-full h-screen items-center flex-col">
      <NavbarCompanents />
      <HomeHead />
    </div>
  );
}

export default Home;
