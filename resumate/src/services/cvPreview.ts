import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";
import { ResumeOverview, ResumeSections } from "../types/resume";

export const generatePreviewUrl = async (
  fullName: string,
  jobTitle: string,
  bio: string,
  skills: string,
  experiences: string,
  educations: string,
  languages: string
): Promise<AxiosResponse<{ url: string }>> => {
  return await apiClient.post("/preview/generate-preview-url", {
    fullName,
    jobTitle,
    bio,
    skills,
    experiences,
    educations,
    languages,
  });
};

export const previewCV = async (
  id: string
): Promise<AxiosResponse<ResumeSections>> => {
  return await apiClient.get(`/preview/${id}`);
};

export const handleDownloadCV = async (url: string): Promise<Blob> => {
  const response = await apiClient.post(
    "/preview/download-cv",
    {
      url,
    },
    {
      responseType: "blob",
    }
  );

  return response.data;
};

export const getUserResumePreviews = async (userId: string): Promise<AxiosResponse<ResumeOverview[]>> => {
  return await apiClient.get(`/user/${userId}/resume-previews`);
}

export const getUserResume = async (userId: string, resumeId: string): Promise<AxiosResponse<string>> => {
  return await apiClient.get(`/user/${userId}/${resumeId}`)
}