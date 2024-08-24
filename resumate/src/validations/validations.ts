import { EducationPeriod } from "@/types/education-period";
import { ExperiencePeriod } from "@/types/experience-period";
import { LanguageKnowledge } from "@/types/language-knowledge";
import { Skill } from "@/types/skill";

const validateJobTitle = (jobTitle: string): string[] => {
  const errors: string[] = [];
  if (jobTitle.length < 2) errors.push("Job title must be 2 characters long.");
  return errors;
};

const validateNameAndBio = (fullName: string, bio: string): string[] => {
  const errors: string[] = [];
  if (fullName.length < 2) errors.push("Name must be 2 characters long.");
  if (bio.length < 20) errors.push("Bio must be 20 characters long.");
  return errors;
};

const validateExperiencePeriods = (
  experiencePeriods: ExperiencePeriod[]
): string[] => {
  const errors: string[] = [];
  let hasError = false;

  experiencePeriods.forEach((experience) => {
    if (
      !experience.description ||
      experience.description.length < 10 ||
      !experience.employer ||
      experience.employer.length < 1 ||
      !experience.jobTitle ||
      experience.jobTitle.length < 2
    ) {
      hasError = true;
    }
  });

  if (hasError)
    errors.push(
      "One or more experiences have invalid fields. Description must be at least 10 characters long, job title must be at least 2 characters long and employer must be at least 1 character long."
    );

  return errors;
};

const validateEducationPeriods = (
  educationPeriods: EducationPeriod[]
): string[] => {
  const errors: string[] = [];
  if (educationPeriods.length < 1) {
    errors.push("To continue, kindly enter at least one education entry.");
  } else {
    let hasError = false;
    educationPeriods.forEach((education) => {
      if (
        !education.description ||
        education.description.length < 10 ||
        !education.school ||
        education.school.length < 3 ||
        !education.degree ||
        education.degree.length < 3
      ) {
        hasError = true;
      }
    });
    if (hasError)
      errors.push(
        "One or more education entries have invalid fields. Description must be at least 10 characters long, Institution and degree must be at least 3 characters long."
      );
  }

  return errors;
};

const validateLanguages = (languages: LanguageKnowledge[]): string[] => {
  const errors: string[] = [];
  if (languages.length < 1) {
    errors.push("You must enter at least one language for your resume.");
  } else {
    let hasError = false;
    languages.forEach((language) => {
      if (!language.lang || language.lang.length < 4) hasError = true;
    });

    if (hasError)
      errors.push("All languages must be at least 4 characters long.");
  }

  return errors;
};

const validateSkills = (skills: Skill[]): string[] => {
  const errors: string[] = [];
  if (skills.length < 2) {
    errors.push("You must enter at least two skills for your resume.");
  } else {
    let hasError = false;
    skills.forEach((skill) => {
      if (!skill.name || skill.name.length < 1) hasError = true;
    });

    if (hasError)
      errors.push("All skill names must be at least 1 character long.");
  }

  return errors;
};

const validatePhoneNumberAndEmail = (phoneNumber: string, email: string) => {
  const errors: string[] = [];
  
  const phoneNumberRegex = /^0\d{1,2}-\d{2}-\d{5}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email) && !phoneNumberRegex.test(phoneNumber)) {
    errors.push("Email and phone number are invalid.");
  }

  return errors;
}

export {
    validateJobTitle,
    validateNameAndBio,
    validateExperiencePeriods,
    validateEducationPeriods,
    validateLanguages,
    validateSkills,
    validatePhoneNumberAndEmail
}