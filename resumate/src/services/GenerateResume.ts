import { Skill } from "@/types/skill";
import { ExperiencePeriod } from "@/types/experience-period"
import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";

type CVData = {
  fullName: string;
  jobTitle: string;
  bio: string;
  skills: Skill[];
  experiences: ExperiencePeriod[]
};

type CVDataResponse = {
  CVTextContent: string;
};

export const generateCVFromScratch = async ({
  fullName,
  jobTitle,
  bio,
  skills,
  experiences
}: CVData): Promise<AxiosResponse<CVDataResponse>> => {
  return apiClient.post("/cv/generate-resume", {
    name: fullName,
    job: jobTitle,
    description: bio,
    skills: skills,
    experiences: experiences
  });
};
