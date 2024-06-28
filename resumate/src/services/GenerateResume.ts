import { Skill } from "@/types/skill";
import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";

type CVData = {
  fullName: string;
  jobTitle: string;
  bio: string;
  skills: Skill[];
};

type CVDataResponse = {
  CVTextContent: string;
};

export const generateCVFromScratch = async ({
  fullName,
  jobTitle,
  bio,
  skills,
}: CVData): Promise<AxiosResponse<CVDataResponse>> => {
  return apiClient.post("/cv/generate-resume", {
    name: fullName,
    job: jobTitle,
    description: bio,
    skills: skills,
  });
};
