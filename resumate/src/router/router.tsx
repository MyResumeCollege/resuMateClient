import { Dashboard } from "@/components/app/dashboard/Dashboard";
import { BackgroundQuestionnaire } from "@/components/app/generating-proccess/background-questionnaire/BackgroundQuestionnaire";
import { Generate } from "@/components/app/generating-proccess/generate/Generate";
import { Start } from "@/components/app/generating-proccess/start/Start";
import ViewCV from "@/components/app/generating-proccess/view-cv/ViewCV";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/build-cv",
    children: [
      { path: "", element: <Start /> },
      { path: "background", element: <BackgroundQuestionnaire /> },
      { path: "generate", element: <Generate /> },
      { path: "view", element: <ViewCV /> },
    ],
  },
]);
