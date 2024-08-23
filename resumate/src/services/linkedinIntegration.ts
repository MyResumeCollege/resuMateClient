import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";
import { EducationPeriod } from "@/types/education-period";
import { ExperiencePeriod } from "@/types/experience-period";
import { Skill } from "@/types/skill";

type LinkedinDataResponse = {
    name: string;
    bio: string;
    skills: Skill[];
    educationPeriods: EducationPeriod[],
    experiencePeriods: ExperiencePeriod[]
}

export const getLinkedinData = async (linkedinProfileUrl: string): Promise<AxiosResponse<LinkedinDataResponse>> => {
    return await apiClient.post(`/linkedin/profile-data`, { profile_link: linkedinProfileUrl });
};