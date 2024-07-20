import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";

export const showCVPreview = async (fullName: string, jobTitle: string): Promise<AxiosResponse<Blob>> => {
    return await apiClient.post(`/preview/cv`, {fullName, jobTitle}, { responseType: 'blob' });
};