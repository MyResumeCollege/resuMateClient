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
import { ForgotPassword } from "@/components/app/forget-password/ForgotPassword";
import { ResetPassword } from "@/components/app/forget-password/ResetPassword";
import Payment from "@/components/app/payment/payment";

const NavbarWrapper = () => {
  return (
    <div className="flex flex-col flex-1 resumate-app">
      <NavBar />
      <main className="resumate">
        <Outlet />
      </main>
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  { path: "/preview/:id/clear", element: <Preview /> },
  // Have NavBar on top
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
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
        path: "/pricing",
        element: <PremiumPlan />, // Add protected Route
      },
      {
        path: "/payment",
        element: <Payment />, // Add protected Route
      },
      {
        path: "/preview/:id",
        element: <Preview />, // Add protected Route
      },
    ],
  },
]);
