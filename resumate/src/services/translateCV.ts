import apiClient from './httpCommon';
import { AxiosResponse } from 'axios';
import {CVDataResponse} from "../types/resume"

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
}: Resume): Promise<AxiosResponse<CVDataResponse>> => {
  return apiClient.post('cv/translate-resume', {
    description: bio,
    skills: skills,
    experiences: experiences,
    resumeLanguage: resumeLanguage,
  });
};
