import { EducationPeriod } from '@/types/education-period';
import { ExperiencePeriod } from '@/types/experience-period';
import { LanguageKnowledge } from '@/types/language-knowledge';
import { Skill } from '@/types/skill';
import { atom } from 'recoil';

// personal

export const fullNameState = atom({
    key: 'fullName',
    default: '',
});

export const summaryState = atom({
    key: 'summary',
    default: '',
});

// job 

export const jobTitleState = atom({
    key: 'jobTitle',
    default: '',
});

// skills

export const skillsState = atom<Skill[]>({
    key: "skills",
    default: []
})

// languages

export const languagesState = atom<LanguageKnowledge[]>({
    key: "languages",
    default: []
})

// experience

export const experienceState = atom<ExperiencePeriod[]>({
    key: "experience",
    default: []
})

// education

export const educationState = atom<EducationPeriod[]>({
    key: 'education',
    default: []
});
