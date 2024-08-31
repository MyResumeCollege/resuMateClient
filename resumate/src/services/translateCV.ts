import { EducationPeriod } from "@/types/education-period";
import { ExperiencePeriod } from "@/types/experience-period";
import { ResumeSections } from "@/types/resume";
import translate from "translate";

export const translateCV = async (
  resumeSections: ResumeSections,
  languageFrom: string,
  languageTo: string
) => {
  const translateIfNotEmpty = async (text: string, key: string) => {
    if (text.trim().length > 0) {
      const translatedText = await translate(text, { from: languageFrom, to: languageTo });
      return { [key]: translatedText };
    }
    return { [key]: text };
  };

  const translateArray = async (
    items: ExperiencePeriod[] | EducationPeriod[],
    translateFunction: (item: any) => Promise<any>
  ) => {
    const translations = await Promise.all(items.map(item => translateFunction(item)));
    return translations;
  };

  const translateExperiencePeriod = async (item: ExperiencePeriod) => {
    const jobTitle = await translateIfNotEmpty(item.jobTitle, 'jobTitle');
    const employer = await translateIfNotEmpty(item.employer, 'employer');
    const description = await translateIfNotEmpty(item.description, 'description');
    return {
      jobTitle: jobTitle.jobTitle || item.jobTitle,
      employer: employer.employer || item.employer,
      description: description.description || item.description
    };
  };

  const translateEducationPeriod = async (item: EducationPeriod) => {
    const degree = await translateIfNotEmpty(item.degree, 'degree');
    const school = await translateIfNotEmpty(item.school, 'school');
    const description = await translateIfNotEmpty(item.description, 'description');
    return {
      degree: degree.degree || item.degree,
      school: school.school || item.school,
      description: description.description || item.description
    };
  };

  const [fullName, jobTitle, bio, skills, languages] = await Promise.all([
    translateIfNotEmpty(resumeSections.fullName, 'fullName'),
    translateIfNotEmpty(resumeSections.jobTitle, 'jobTitle'),
    translateIfNotEmpty(resumeSections.bio, 'bio'),
    translateIfNotEmpty(resumeSections.skills, 'skills'),
    translateIfNotEmpty(resumeSections.languages, 'languages')
  ]);

  const experiences = await translateArray(resumeSections.experiences, translateExperiencePeriod);
  const educations = await translateArray(resumeSections.educations, translateEducationPeriod);
  
  return {
    fullName: fullName.fullName || resumeSections.fullName,
    jobTitle: jobTitle.jobTitle || resumeSections.jobTitle,
    bio: bio.bio || resumeSections.bio,
    skills: skills.skills || resumeSections.skills,
    experiences: experiences.length ? experiences : resumeSections.experiences,
    educations: educations.length ? educations : resumeSections.educations,
    languages: languages.languages || resumeSections.languages
  };
};
