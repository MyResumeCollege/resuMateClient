import { Dashboard } from "@/components/app/dashboard/Dashboard";
import { BackgroundQuestionnaire } from "@/components/app/generating-proccess/background-questionnaire/BackgroundQuestionnaire";
import { Generate } from "@/components/app/generating-proccess/generate/Generate";
import { Start } from "@/components/app/generating-proccess/start/Start";
import Preview from "@/components/app/generating-proccess/view-cv/Preview";
import ViewCV from "@/components/app/generating-proccess/view-cv/ViewCV";
import { Login } from "@/components/app/login/Login";
import { NavBar } from "@/components/app/nav-bar/NavBar";
import { PremiumPlan } from "@/components/app/premium/PremiumPlan";
import { Register } from "@/components/app/register/Register";
import { createBrowserRouter, Outlet } from "react-router-dom";

const NavbarWrapper = () => {
  return (
    <div className="flex flex-col flex-1 resumate-app">
      <NavBar />
      <main className="resumate">
        <Outlet />
      </main>
    </div>
  )
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
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
      {
        path: "/premiumPlan",
        element: <PremiumPlan /> // Add protected Route
      },
      {
        path: "/preview/:id",
        element: <Preview /> // Add protected Route
      }
    ]
  },
  { path: "/preview/:id/clear", element: <Preview /> }
]);
