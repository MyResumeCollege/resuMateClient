import { AxiosResponse } from "axios";
import { User } from "../types/user";
import apiClient from "./httpCommon";
import { CredentialResponse } from "@react-oauth/google"

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export const headers = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `Bearer ${tokens.refreshToken}`,
    };
  }
  return {};
};

export const getTokens = () => {
  return {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
    refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
  };
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const resetTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type GoogleSignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const googleSignIn = async (
  credentialResponse: CredentialResponse,
  type?: string,
  bio?: string
  ): Promise<AxiosResponse<GoogleSignInResponse>> => {
    return await apiClient.post("/auth/google", {
      credentialResponse,
      type,
      bio
    })
}