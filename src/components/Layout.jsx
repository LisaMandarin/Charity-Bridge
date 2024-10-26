import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-screen min-w-[350px] bg-slate-100 flex flex-col">
            <div className="bg-pink-200 h-24">
                <Header />
            </div>
            <div className="flex flex-col flex-grow justify-center items-center">
                <Outlet />
            </div>
            <div className="bg-pink-200 h-14">
                <Footer />
            </div>
            
        </div>
    )
}