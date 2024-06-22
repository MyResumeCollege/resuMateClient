import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import { router } from "./router/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Toaster />
      <main className="resumate">
        <RouterProvider router={router} />
      </main>
    </RecoilRoot>
  </React.StrictMode>
);
