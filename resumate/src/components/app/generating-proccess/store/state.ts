import { EducationPeriod } from '@/types/education-period';
import { ExperiencePeriod } from '@/types/experience-period';
import { LanguageKnowledge } from '@/types/language-knowledge';
import { Skill } from '@/types/skill';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

// personal

export const fullNameState = atom({
    key: 'fullName',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// email 

export const emailState = atom({
    key: 'email',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// phone number 

export const phoneNumberState = atom({
    key: 'phoneNumber',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// summary 

export const summaryState = atom({
    key: 'summary',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// job 

export const jobTitleState = atom({
    key: 'jobTitle',
    default: '',
    effects_UNSTABLE: [persistAtom],
});

// skills

export const skillsState = atom<Skill[]>({
    key: "skills",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

// languages

export const languagesState = atom<LanguageKnowledge[]>({
    key: "languages",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

// experience

export const experienceState = atom<ExperiencePeriod[] | string>({
    key: "experience",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

// education

export const educationState = atom<EducationPeriod[] | string>({
    key: 'education',
    default: [],
    effects_UNSTABLE: [persistAtom],
});

// template

export const templateState = atom<number>({
    key: 'template',
    default: 1,
    effects_UNSTABLE: [persistAtom],
});
