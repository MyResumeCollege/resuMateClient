import { Skill } from "@/types/skill";
import { ExperiencePeriod } from "@/types/experience-period"
import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";
import { EducationPeriod } from "@/types/education-period";
import { LanguageKnowledge } from "@/types/language-knowledge";

type Resume = {
  bio: string;
  skills: Skill[];
  experiences: ExperiencePeriod[];
  educations: EducationPeriod[];
  languages: LanguageKnowledge[];
};

type GenerateSectionData = {
  data: string
}

export const generateCVFromScratch = async ({
  bio,
  skills,
  experiences,
  educations,
  languages
}: Resume): Promise<AxiosResponse<string[]>> => {
  
  return apiClient.post("/cv/generate-resume", {
    bio: bio,
    skills: skills,
    experiences: experiences,
    educations: educations,
    languages: languages
  });
};

export const generateSection = async ({ data }: GenerateSectionData): Promise<AxiosResponse<string>> => {  
  return apiClient.post("/cv/generate-section", { data });
};