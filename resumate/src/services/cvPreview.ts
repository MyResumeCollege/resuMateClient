import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";

export const showCVPreview = async (fullName: string, jobTitle: string, bio: string, skills: string, experiences: string): Promise<AxiosResponse<Blob>> => {
    return await apiClient.post(`/preview/cv`, {fullName, jobTitle, bio, skills, experiences}, { responseType: 'blob' });
};