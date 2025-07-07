import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Mainlayout() {
  return (
    <>
      
      <main className="w-full max-w-[1700px] h-dvh mx-auto ">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}
