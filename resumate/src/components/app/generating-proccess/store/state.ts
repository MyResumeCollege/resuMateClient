import { atom } from 'recoil';

// personal

export const fullNameState = atom({
    key: 'fullName',
    default: '',
});

export const bioState = atom({
    key: 'bio',
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