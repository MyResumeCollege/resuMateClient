import { TemplateProps } from "@/types/template-props";
import { EditableText } from "../shared/editable-text/EditableText";
import { RegenerateButton } from "../shared/regenerate-button/RegenerateButton";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import Educations from "./shared/Educations";
import { EducationPeriod } from "@/types/education-period";
import Experiences from "./shared/Experiences";
import { ExperiencePeriod } from "@/types/experience-period";

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item} className="text-xs">
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

export const NewspaperDarkTemplate = ({ resume, onRegenerateSection, onRephraseSection, readonly = false }: TemplateProps) => {
  const {
    fullName,
    email,
    phoneNumber,
    bio,
    jobTitle,
    languages,
    skills,
    experiences,
    educations
  } = resume;

  const Title = (text: string, options?: { onRegenerate?: () => void }) => {
    return (
      <div className="flex flex-col mb-2">
        <h2 className="text-lg font-semibold uppercase">
          {text}
          {options?.onRegenerate && !readonly &&
            <RegenerateButton
              onClick={options.onRegenerate}
              style={{ marginLeft: 10 }}
            />}
        </h2>
      </div>
    );
  };

  const HorizontalDivider = <div className="w-full h-[1px] bg-[#8d8d8d]"></div>;
  const VerticalDivider = <div className="h-full w-[1px] bg-[#8d8d8d]"></div>;

  return (
    <div className="flex-1 flex flex-col bg-[#05102e] text-white border border-gray-300 overflow-auto relative p-6 font-lora">
      <div className="flex flex-col items-center justify-center py-[30px]">
        <h2 className="font-bold text-3xl">{fullName}</h2>
        <span className="text-md">{jobTitle}</span>
      </div>
      <div className="text-xs flex flex-col items-center">
        {HorizontalDivider}
        {/* {Title("Contact Info")} */}
        <div className="flex items-center mt-2">
          <FaPhoneAlt className="mr-2" />
          <span>{phoneNumber}</span>
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="mr-2" />
          <span>{email}</span>
        </div>
        {HorizontalDivider}
      </div>
      {HorizontalDivider}
      <div className="flex flex-1">
        <div className="left flex-[2] pt-[20px] pr-5">
          <div className="mb-3">
            {Title('Skills')}
            {List(skills)}
          </div>
          {HorizontalDivider}
          <div className="mb-3 mt-3">
            {Title('Education', { onRegenerate: () => onRegenerateSection('educations') })}
            <Educations
              educations={educations}
              onRephraseSection={onRephraseSection}
              readonly={readonly}
            />
          </div>
          {HorizontalDivider}
          <div className="mb-3 mt-3">
            {Title('Languages')}
            {List(languages)}
          </div>
        </div>
        {VerticalDivider}
        <div className="right flex-[3] shrink-0 pt-[20px] pl-5">
          <div className="mb-3">
            {Title('About Me', { onRegenerate: () => onRegenerateSection('bio') })}
            <EditableText
              className="text-xs"
              readonly={readonly}
              onChange={newValue => onRephraseSection('bio', newValue)}>
              {bio}
            </EditableText>
          </div>
          {HorizontalDivider}
          <div className="mb-3 mt-3">
            {Title('Experience', { onRegenerate: () => onRegenerateSection('experiences') })}
            <Experiences
              experiences={experiences}
              onRephraseSection={onRephraseSection}
              readonly={readonly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
