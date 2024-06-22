import { AxiosResponse } from "axios";
import apiClient from "./httpCommon";

type CVUploadResponse = {
    CVTextContent: string;
};

export const uploadResume = async (pdfFile: File): Promise<AxiosResponse<CVUploadResponse>> => {
    const formData = new FormData();
    formData.append("file", pdfFile);
    return await apiClient.post(`/cv/upload-resume`, formData, {
        headers: {
            // TODO authService
            'Content-Type': 'multipart/form-data'
        },
    });
};