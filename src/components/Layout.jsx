import { Header } from "./Header/Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div className="min-h-screen min-w-[350px] bg-white flex flex-col">
      <div className="bg-pink-200 h-24">
        <Header />
      </div>
      <div className="flex flex-col flex-grow items-center">
        <Outlet />
      </div>
      <div className="bg-pink-200 h-14">
        <Footer />
      </div>
    </div>
  );
}
