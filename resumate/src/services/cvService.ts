import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";
import { ResumeOverview, ResumeSections } from "@/types/resume";

type cvData = {
  resumePreviewId?: string;
  fullName?: string;
  jobTitle?: string;
  bio?: string;
  skills?: string;
  experiences?: string;
  educations?: string;
  languages?: string;
  template: number;
  resumeLanguage: string
}

type SetUrlForPreviewResponse = {
  url: string;
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
      url
    },
    {
      responseType: "blob",
    }
  );  
  return response.data;
};

export const downloadPDF = async (resumeUrl: string, fileName: string) => {
  try {
    const response = await handleDownloadCV(resumeUrl)
    if (response instanceof Blob) {
      const downloadUrl = window.URL.createObjectURL(response)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } else console.error('Response is not a Blob')
  } catch (error) {
    console.error('Error downloading the PDF:', error)
  }
}

export const generatePreviewUrl = async (
  fullName: string,
  jobTitle: string,
  bio: string,
  skills: string,
  experiences: string,
  educations: string,
  languages: string,
  template: number,
  resumeLanguage: string
): Promise<AxiosResponse<{ url: string }>> => {
  return await apiClient.post("/preview/create-preview", {
    fullName,
    jobTitle,
    bio,
    skills,
    experiences,
    educations,
    languages,
    template,
    resumeLanguage
  });
};

export const updateCvPreview = async(cvData: cvData) => {
  await apiClient.post<SetUrlForPreviewResponse>(
    `/preview/create-preview/${cvData.resumePreviewId}`,
    {
    fullName: cvData.fullName,
    jobTitle: cvData.jobTitle,
    bio: cvData.bio,
    skills: cvData.skills,
    experiences: cvData.experiences,
    educations: cvData.educations,
    languages: cvData.languages,
    template: cvData.template,
    resumeLanguage: cvData.resumeLanguage
  });
}

export const upsertResume = async (userId: string, cvData: cvData) => {
  return await apiClient.post(`/user/${userId}/upsert`, cvData); 
};

export const getUserResumePreviews = async (userId: string): Promise<AxiosResponse<ResumeOverview[]>> => {
  return await apiClient.get(`/user/${userId}/resume-previews`);
}

export const getUserResume = async (userId: string, resumeId: string): Promise<AxiosResponse<string>> => {
  return await apiClient.get(`/user/${userId}/${resumeId}`)
}

export const removeCV = async (userId: string, resumeId: string) => {
  return await apiClient.delete(`/user/${userId}/${resumeId}`)
}