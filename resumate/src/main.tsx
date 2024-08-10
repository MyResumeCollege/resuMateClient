import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import "./index.css";
import { router } from "./router/router";
import { QueryClient, QueryClientProvider } from "react-query";

const googleClientId = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

if (!googleClientId) {
  throw new Error("Google Client ID is not defined in environment variables");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Toaster />
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);
