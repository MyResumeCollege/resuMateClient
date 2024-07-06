export type ExperiencePeriodTime = {
    month: string;
    year: string;
}

export type ExperiencePeriod = {
    id: string;
    jobTitle: string;
    employer: string;
    city: string;
    startDate: ExperiencePeriodTime;
    endDate: ExperiencePeriodTime;
    isCurrent: boolean;
    description: string;
}