import apiClient from "./httpCommon";
import { AxiosResponse } from "axios";

type CVUploadResponse = {
    CVTextContent: string;
};

export const uploadResume = async (pdfFile: File): Promise<AxiosResponse<CVUploadResponse>> => {
    const formData = new FormData();
    formData.append("file", pdfFile);
    return await apiClient.post(`/resume/upload-resume`, formData, {
        headers: {
            // TODO authService
            'Content-Type': 'multipart/form-data'
        },
    });
};