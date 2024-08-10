import { Skill } from "@/types/skill";
import apiClient from "./httpCommon";
import { LanguageKnowledge } from "@/types/language-knowledge";

type cvData = {
  ownerId: string;
  fullName: string;
  jobTitle: string;
  bio: string;
  skills: Skill[];
  experiences: string;
  educations: string;
  languages: LanguageKnowledge[];
}

export const saveCV = async (cvData: cvData) => {
  const response = await apiClient.post("/cv/save-resume", cvData);
  return response.data;
};
