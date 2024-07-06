import { ExperiencePeriod } from '@/types/experience-period';
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

export const educationState = atom({
    key: 'education',
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

// experience

export const experienceState = atom<ExperiencePeriod[]>({
    key: "experience",
    default: []
})