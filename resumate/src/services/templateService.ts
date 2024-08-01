import apiClient from "./httpCommon";

export interface Template {
  _id: string;
  imageUrl: string;
  isPremium: boolean;
}

export const fetchTemplates = async (): Promise<Template[]> => {
  try {
    const response = await apiClient.get("/templates/get-templates");
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch templates");
  }
};
