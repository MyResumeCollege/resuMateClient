import { Skill } from "@/types/skill";
import { ExperiencePeriod } from "@/types/experience-period"
import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";

type Resume = {
  bio: string;
  skills: Skill[];
  experiences: ExperiencePeriod[]
};

type CVDataResponse = {
  CVTextContent: string;
};

export const generateCVFromScratch = async ({
  bio,
  skills,
  experiences
}: Resume): Promise<AxiosResponse<CVDataResponse>> => {
  return apiClient.post("/cv/generate-resume", {
    description: bio,
    skills: skills,
    experiences: experiences
  });
};
