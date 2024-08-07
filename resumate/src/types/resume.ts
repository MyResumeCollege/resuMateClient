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
  bio: string;
  skills: string;
  experiences: string;
  educations: string;
  languages: string;
};

export type ResumeOverview = Pick<ResumeSections, 'fullName' | 'jobTitle'> & {
  id: string;
  creationDate: Date;
};
