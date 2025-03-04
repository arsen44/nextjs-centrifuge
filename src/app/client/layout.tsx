"use client";
import React from "react";
import NavBar from "../components/clinet-dashboard/navbar/navbar";

export default function ClinetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
