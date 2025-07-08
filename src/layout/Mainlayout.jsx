import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Mainlayout() {
  return (
    <>
      <main className=" px-2 md:px-2 lg:px-0 w-full max-w-[1700px] h-dvh mx-auto ">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </>
  );
}
