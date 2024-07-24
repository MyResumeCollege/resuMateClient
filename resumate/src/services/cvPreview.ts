import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";
import {ResumeSections} from "../types/resume"

export const generatePreviewUrl = async (
    fullName: string, 
    jobTitle: string, 
    bio: string, 
    skills: string, 
    experiences: string, 
    educations: string, 
    languages: string
): Promise<AxiosResponse<{ url: string }>> => {
    return await apiClient.post('/preview/generate-preview-url', {
        fullName,
        jobTitle,
        bio,
        skills,
        experiences,
        educations,
        languages
    });
};

export const previewCV = async (id: string): Promise<AxiosResponse<ResumeSections>> => {
    return apiClient.get(`/preview/${id}`);
  };