import { TemplateProps } from "@/types/template-props";
import { EditableText } from "../shared/editable-text/EditableText";
import { RegenerateButton } from "../shared/regenerate-button/RegenerateButton";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { EducationPeriod } from "@/types/education-period";
import { ExperiencePeriod } from "@/types/experience-period";

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item} className="text-xs">
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

export const FolderTemaplate = ({
  resume,
  onRegenerateSection,
  onRephraseSection,
  readonly = false,
}: TemplateProps) => {
  const {
    fullName,
    email,
    phoneNumber,
    bio,
    jobTitle,
    languages,
    skills,
    educations,
    experiences,
  } = resume;

  const Title = (text: string, options?: { onRegenerate?: () => void }) => {
    return (
      <div className="flex flex-col mb-2">
        <h2 className="text-lg font-semibold uppercase">
          {text}
          {options?.onRegenerate && !readonly && (
            <RegenerateButton
              onClick={options.onRegenerate}
              style={{ marginLeft: 10 }}
            />
          )}
        </h2>
      </div>
    );
  };

  const Experiences = () => {
    return (
      <>
        {experiences.map((experience, index) => {
          const startMonth = (experience as ExperiencePeriod).startDate.month;
          const startYear = (experience as ExperiencePeriod).startDate.year;
          const endMonth = (experience as ExperiencePeriod).endDate?.month || "current";
          const endYear = (experience as ExperiencePeriod).endDate?.year || "";
  
          const formattedStartDate = `${startMonth}/${startYear}`;
          const formattedEndDate = endYear
            ? `${endMonth}/${endYear}`
            : endMonth;
  
          return (
            <EditableText
              key={index}
              className="text-xs"
              readonly={readonly}
              onChange={(newValue) =>
                onRephraseSection("experiences", newValue, index)
              }
            >
              <div className="my-3">
                <div className="font-semibold text-sm">
                  {(experience as ExperiencePeriod).jobTitle}
                </div>
                <div className="text-xs italic text-gray-600">
                  {(experience as ExperiencePeriod).employer}
                </div>
                <div className="text-xs text-gray-500">
                  {formattedStartDate} - {formattedEndDate}
                </div>
                <div className="text-xs mt-1">
                  {(experience as ExperiencePeriod).description}
                </div>
              </div>
            </EditableText>
          );
        })}
      </>
    );
  };  

  const Educations = () => {
    return (
      <>
        {educations.map((education, index) => {
          const startMonth = (education as EducationPeriod).startDate.month;
          const startYear = (education as EducationPeriod).startDate.year;
          const endMonth = (education as EducationPeriod).endDate?.month || "current";
          const endYear = (education as EducationPeriod).endDate?.year || "";
  
          const formattedStartDate = `${startMonth}/${startYear}`;
          const formattedEndDate = endYear
            ? `${endMonth}/${endYear}`
            : endMonth;
  
          return (
            <EditableText
              key={index}
              className="text-xs"
              readonly={readonly}
              onChange={(newValue) =>
                onRephraseSection("educations", newValue, index)
              }
            >
              <div className="my-3">
                <div className="font-semibold text-sm">
                  {(education as EducationPeriod).degree}
                </div>
                <div className="text-xs italic text-gray-600">
                  {(education as EducationPeriod).school}
                </div>
                <div className="text-xs text-gray-500">
                  {formattedStartDate} - {formattedEndDate}
                </div>
                <div className="text-xs mt-1">
                  {(education as EducationPeriod).description}
                </div>
              </div>
            </EditableText>
          );
        })}
      </>
    );
  };  

  return (
    <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative">
      <div className="left p-6 flex-1 flex flex-col">
        <div className="my-3">
          {Title("Experience", {
            onRegenerate: () => onRegenerateSection("experiences"),
          })}
          {Experiences()}
        </div>
        <div className="my-3">
          {Title("Education", {
            onRegenerate: () => onRegenerateSection("educations"),
          })}
          {Educations()}
        </div>
        <div className="my-3">
          {Title("Skills")}
          {List(skills)}
        </div>
      </div>
      <div className="right p-6 bg-[#18203d] w-[300px] text-white text-xs">
        <div className="text-3xl font-bold pr-6">{fullName}</div>
        <div className="text-sm font-semibold mb-[40px] opacity-60">
          {jobTitle}
        </div>
        <div className="my-3">
          {Title("Contact")}
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>{email}</span>
          </div>
        </div>
        <div className="my-3">
          {Title("About Me", {
            onRegenerate: () => onRegenerateSection("bio"),
          })}
          <EditableText
            className="text-xs"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("bio", newValue)}
          >
            {bio}
          </EditableText>
        </div>
        <div className="my-3">
          {Title("Languages")}
          {List(languages)}
        </div>
      </div>
    </div>
  );
};
