import { ResumeSections } from "@/types/resume";
import translate from "translate";
export const translateCV = async (resumeSections: ResumeSections, languageFrom: string, languageTo: string) => {
  const translations: Record<string, string> = {};

  const translateIfNotEmpty = async (text: string, key: string) => {
    if (text.trim()) {
      const translatedText = await translate(text, { from: languageFrom, to: languageTo });
      translations[key] = translatedText;
    }
  };

  await Promise.all([
    translateIfNotEmpty(resumeSections.fullName, 'fullName'),
    translateIfNotEmpty(resumeSections.jobTitle, 'jobTitle'),
    translateIfNotEmpty(resumeSections.bio, 'bio'),
    translateIfNotEmpty(resumeSections.skills, 'skills'),
    // translateIfNotEmpty(resumeSections.experiences, 'experiences'),
    // translateIfNotEmpty(resumeSections.educations, 'educations'),
    translateIfNotEmpty(resumeSections.languages, 'languages')
  ]);

  return {
    fullName: translations.fullName || resumeSections.fullName,
    jobTitle: translations.jobTitle || resumeSections.jobTitle,
    bio: translations.bio || resumeSections.bio,
    skills: translations.skills || resumeSections.skills,
    experiences: translations.experiences || resumeSections.experiences,
    educations: translations.educations || resumeSections.educations,
    languages: translations.languages || resumeSections.languages
  };
};