import apiClient from './httpCommon';
import { AxiosResponse } from 'axios';

type Resume = {
  bio: string;
  skills: string;
  experiences: string;
  resumeLanguage: string;
};

export const translateCV = async ({
  bio,
  skills,
  experiences,
  resumeLanguage,
}: Resume): Promise<AxiosResponse<string[]>> => {
  return apiClient.post('/resume/translate-resume', {
    bio,
    skills,
    experiences,
    resumeLanguage,
  });
};
