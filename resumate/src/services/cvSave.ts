import apiClient from "./httpCommon";

export const cvSave = async (cvData: any) => {
  const response = await apiClient.post("/cv/save-resume", cvData);
  return response.data;
};
