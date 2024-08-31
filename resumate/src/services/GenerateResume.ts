import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";

type Resume = {
  bio: string;
  experiences: string[];
  educations: string[];
};

type GenerateSectionData = {
  data: string
}

export const generateCVFromScratch = async ({
  bio,
  experiences,
  educations,
}: Resume): Promise<AxiosResponse<Resume>> => {    
  return apiClient.post("/resume/generate-resume", {
    bio: bio,
    experiences: experiences,
    educations: educations
  });
};

export const generateSection = async ({ data }: GenerateSectionData): Promise<AxiosResponse<string>> => {  
  return apiClient.post("/resume/generate-section", { data });
};