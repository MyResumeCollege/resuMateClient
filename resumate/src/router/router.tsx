import { createBrowserRouter } from "react-router-dom";
import { BackgroundTest } from "@/components/app/generating-proccess/background-test/BackgroundTest";
import { Start } from "@/components/app/generating-proccess/start/Start";
import { Dashboard } from "@/components/app/dashboard/Dashboard";
import { Loading } from "@/components/app/generating-proccess/loading/Loading";
import { ViewCV } from "@/components/app/generating-proccess/view-cv/ViewCV";

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
            { path: "loading", element: <Loading /> },
            { path: "view", element: <ViewCV /> },
        ]
    },
]);