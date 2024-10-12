import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <header className="bg-pink-200 h-24">
                <Header />
            </header>
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className="bg-pink-200 h-14">
                <Footer />
            </footer>
            
        </div>
    )
}