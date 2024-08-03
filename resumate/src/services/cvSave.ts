import apiClient from "./httpCommon";

export const cvSave = async (cvData: any) => {
  const response = await apiClient.post("/cv/save-resume", cvData);
  console.log(response.data);
  return response.data;
};
