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
  return apiClient.post('cv/translate-resume', {
    description: bio,
    skills: skills,
    experiences: experiences,
    resumeLanguage: resumeLanguage,
  });
};
