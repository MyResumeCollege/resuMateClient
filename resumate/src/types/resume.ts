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
  template: number;
};

export type ResumeOverview = {
  id: string;
  jobTitle: string;
  creationDate: Date;
};
