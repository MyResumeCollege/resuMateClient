import React from 'react';
import { EditableText } from "../../shared/editable-text/EditableText";
import { EducationPeriod } from "@/types/education-period";
import { ResumeSections } from '@/types/resume';
import { useRecoilValue } from 'recoil';
import { educationState } from '@/components/app/generating-proccess/store/state';

interface EducationsProps {
  educations: EducationPeriod[];
  onRephraseSection: (section: keyof ResumeSections, newValue: string, index: number) => void;
  readonly: boolean;
}

const Educations: React.FC<EducationsProps> = ({ educations, onRephraseSection, readonly }) => {
  const educationPeriods = useRecoilValue(educationState);

  return (
    <>
      {educations.map((education, index) => {
        const { startDate, endDate, degree, school, description } = education;
        const startMonth = startDate.month;
        const startYear = startDate.year;
        const endMonth = endDate?.month || "current";
        const endYear = endDate?.year || "";
        const formattedStartDate = `${startMonth}/${startYear}`;
        const formattedEndDate = endYear ? `${endMonth}/${endYear}` : endMonth;

        return (
          <div key={index} className="my-3">
            <div className="font-semibold text-sm">{degree}</div>
            <div className="text-xs italic text-gray-600">{school}</div>
            <div className="text-xs text-gray-500">{formattedStartDate} - {formattedEndDate}</div>
            <EditableText
              className="text-xs"
              readonly={readonly}
              onChange={(newValue) => onRephraseSection("educations", newValue, index)}
            >
              {educationPeriods[index].description !== "" ? description: ""}
            </EditableText>
          </div>
        );
      })}
    </>
  );
};

export default Educations;
