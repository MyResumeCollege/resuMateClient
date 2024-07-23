import apiClient from './httpCommon';
import { AxiosResponse } from 'axios';

type Resume = {
  bio: string;
  skills: string[];
  experiences: string[];
  resumeLanguage: string;
};

type CVDataResponse = {
  translatedCV: string[];
};
export const translateCV = async ({
  bio,
  skills,
  experiences,
  resumeLanguage,
}: Resume): Promise<AxiosResponse<CVDataResponse>> => {
  return apiClient.post('http://localhost:3000/api/cv/translate-resume', {
    description: bio,
    skills: skills,
    experiences: experiences,
    resumeLanguage: resumeLanguage,
  });
};
