import React from "react";
import { Outlet } from "react-router-dom";

export default function Mainlayout() {
  return (
    <>
      <main className="w-full max-w-[1700px] h-dvh mx-auto ">
        <Outlet />
      </main>
    </>
  );
}
