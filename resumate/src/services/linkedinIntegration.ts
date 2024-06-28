import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";

type LinkedinDataResponse = {
    name: string;
    summary: string;
    skills: Skill[]
}

type Skill = {
    name: string
}

export const getLinkedinData = async (linkedinProfileUrl: string): Promise<AxiosResponse<LinkedinDataResponse>> => {
    return await apiClient.post(`/linkedin/profile-data`, { profile_link: linkedinProfileUrl });
};