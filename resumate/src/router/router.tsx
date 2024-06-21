import { Dashboard } from "@/components/app/dashboard/Dashboard";
import { BackgroundQuestionnaire } from "@/components/app/generating-proccess/background-questionnaire/BackgroundQuestionnaire";
import { Loading } from "@/components/app/generating-proccess/loading/Loading";
import { Start } from "@/components/app/generating-proccess/start/Start";
import { ViewCV } from "@/components/app/generating-proccess/view-cv/ViewCV";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/generate",
        children: [
            { path: "", element: <Start /> },
            { path: "background", element: <BackgroundQuestionnaire /> },
            { path: "loading", element: <Loading /> },
            { path: "view", element: <ViewCV /> },
        ]
    },
]);