import { EducationPeriod } from "./education-period";
import { ExperiencePeriod } from "./experience-period";

export type GenerateResumeInput = {
  name: string;
  job: string;
  education: string;
  experience: string;
  description: string;
};

export type ResumeSections = {
  fullName: string;
  jobTitle: string;
  email?: string;
  phoneNumber?: string;
  bio: string;
  skills: string;
  experiences: string[] | ExperiencePeriod[];
  educations: string[] | EducationPeriod[];
  languages: string;
  template: number;
  resumeLanguage: string;
};

export type ResumeOverview = {
  id: string;
  jobTitle: string;
  creationDate: Date;
};
