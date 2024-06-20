import { createBrowserRouter } from "react-router-dom";
import { BackgroundTest } from "@/components/app/generating-proccess/background-test/BackgroundTest";
import { Start } from "@/components/app/generating-proccess/start/Start";
import { Dashboard } from "@/components/app/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/generate",
        children: [
            { path: "", element: <Start /> },
            { path: "background", element: <BackgroundTest /> },
        ]
    },
]);