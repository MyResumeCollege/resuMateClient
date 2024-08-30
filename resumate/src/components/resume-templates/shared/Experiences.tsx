import React from 'react';
import { EditableText } from "../../shared/editable-text/EditableText";
import { ExperiencePeriod } from "@/types/experience-period";
import { ResumeSections } from '@/types/resume';

interface ExperiencesProps {
  experiences: ExperiencePeriod[];
  onRephraseSection: (section: keyof ResumeSections, newValue: string, index?: number) => void;
  readonly: boolean;
}

const Experiences: React.FC<ExperiencesProps> = ({ experiences, onRephraseSection, readonly }) => {
  return (
    <>
      {experiences.map((experience, index) => {
        const { startDate, endDate, jobTitle, employer, description } = experience;
        const startMonth = startDate.month;
        const startYear = startDate.year;
        const endMonth = endDate?.month || "current";
        const endYear = endDate?.year || "";
        const formattedStartDate = `${startMonth}/${startYear}`;
        const formattedEndDate = endYear ? `${endMonth}/${endYear}` : endMonth;

        return (
          <div key={index} className="my-3">
            <div className="font-semibold text-sm">{jobTitle}</div>
            <div className="text-xs italic text-gray-600">{employer}</div>
            <div className="text-xs text-gray-500">{formattedStartDate} - {formattedEndDate}</div>
            <EditableText
              className="text-xs"
              readonly={readonly}
              onChange={(newValue) => onRephraseSection("experiences", newValue, index)}
            >
              {description}
            </EditableText> 
          </div>
        );
      })}
    </>
  );
};

export default Experiences;
