import { useRecoilValue } from "recoil";
import { educationState, experienceState } from "@/components/app/generating-proccess/store/state";
import { EducationPeriod } from "@/types/education-period";
import { ExperiencePeriod } from "@/types/experience-period";

export const useFormattedData = (experiences: string[], educations: string[]) => {
    const experiencePeriods = useRecoilValue(experienceState) as ExperiencePeriod[];
    const educationPeriods = useRecoilValue(educationState) as EducationPeriod[];

    const formatExperiences = () => {
        return experiences.map((description, index) => {
            const period = experiencePeriods[index] as ExperiencePeriod;
            const jobTitle = period?.jobTitle || '';
            const employer = period?.employer ? ` at ${period.employer}` : '';
            const startDate = period?.startDate ? ` (${period.startDate.month} ${period.startDate.year}` : '';
            const endDate = period?.endDate ? ` - ${period.endDate.month} ${period.endDate.year})` : ')';

            return `${jobTitle}${employer}${startDate}${endDate} \n\n${description}`;
        });
    };

    const formatEducations = () => {
        return educations.map((education, index) => {
            const period = educationPeriods[index] as EducationPeriod;
            const degree = period?.degree || '';
            const institution = period?.school ? ` at ${period.school}` : '';
            const startDate = period?.startDate ? ` (${period.startDate.month} ${period.startDate.year}` : '';
            const endDate = period?.endDate ? ` - ${period.endDate.month} ${period.endDate.year})` : ')';

            return `${degree}${institution}${startDate}${endDate} \n\n${education}`;
        });
    };

    return { formattedExperiences: formatExperiences(), formattedEducations: formatEducations() };
};
