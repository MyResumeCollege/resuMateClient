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

export const generateCVFromScratch = async ({
  bio,
  skills,
  experiences,
  educations,
  languages
}: Resume): Promise<AxiosResponse<string[]>> => {
  
  return apiClient.post("/cv/generate-resume", {
    description: bio,
    skills: skills,
    experiences: experiences,
    educations: educations,
    languages: languages
  });
};