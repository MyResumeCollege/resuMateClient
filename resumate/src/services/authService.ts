import { AxiosResponse } from "axios";
import { User } from "../types/user";
import apiClient from "./httpCommon";
import { CredentialResponse } from "@react-oauth/google";

export const ACCESS_TOKEN_KEY = "accessToken";
export const REFRESH_TOKEN_KEY = "refreshToken";

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

export const refreshTokenHeaders = () => {
  const tokens = getTokens();
  if (tokens.refreshToken) {
    return {
      Authorization: `Bearer ${tokens.refreshToken}`,
    };
  }
  return {};
};

type GoogleSignInResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const googleSignIn = async (
  credentialResponse: CredentialResponse,
  type?: string,
  bio?: string
): Promise<AxiosResponse<GoogleSignInResponse>> => {
  return await apiClient.post("/auth/google", {
    credentialResponse,
    type,
    bio,
  });
};

type LoginUserResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AxiosResponse<LoginUserResponse>> => {
  return await apiClient.post("/auth/login", { email, password });
};

type RegisterUserResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

export const registerUser = async (userData: {
  email: string;
  password: string;
  name: string;
}): Promise<AxiosResponse<RegisterUserResponse>> => {
  return await apiClient.post("/auth/register", userData);
};

export const logout = async () => {
  return await apiClient.post(
    "/auth/logout",
    {},
    { headers: refreshTokenHeaders() }
  );
};