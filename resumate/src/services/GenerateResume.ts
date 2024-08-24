import { ExperiencePeriod } from "@/types/experience-period"
import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";
import { EducationPeriod } from "@/types/education-period";

type Resume = {
  bio: string;
  experiences: ExperiencePeriod[];
  educations: EducationPeriod[];
};

type GenerateSectionData = {
  data: string
}

export const generateCVFromScratch = async ({
  bio,
  experiences,
  educations,
}: Resume): Promise<AxiosResponse<string[]>> => {
  
  return apiClient.post("/resume/generate-resume", {
    bio: bio,
    experiences: experiences,
    educations: educations
  });
};

export const generateSection = async ({ data }: GenerateSectionData): Promise<AxiosResponse<string>> => {  
  return apiClient.post("/resume/generate-section", { data });
};