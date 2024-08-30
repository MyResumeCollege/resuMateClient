import { NavBar } from "@/components/app/nav-bar/NavBar";
import { Outlet } from "react-router-dom";

export const NavbarWrapper = () => {
    return (
        <div className="flex flex-col flex-1 resumate-app max-h-[100vh]">
            <NavBar />
            <main className="resumate">
                <Outlet />
            </main>
        </div>
    );
};