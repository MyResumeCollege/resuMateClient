export type EducationPeriodTime = {
    month: string;
    year: string;
}

export type EducationPeriod = {
    id: string;
    degree: string;
    school: string;
    startDate: EducationPeriodTime;
    endDate: EducationPeriodTime;
    isCurrent: boolean;
    description: string;
}