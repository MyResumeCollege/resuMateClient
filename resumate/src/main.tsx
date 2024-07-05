import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import { router } from "./router/router";

const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;

if (!googleClientId) {
  throw new Error("Google Client ID is not defined in environment variables");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <RecoilRoot>
      <Toaster />
      <main className="resumate">
        <RouterProvider router={router} />
      </main>
    </RecoilRoot>
  </GoogleOAuthProvider>

);
