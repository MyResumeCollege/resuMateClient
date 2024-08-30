import { TemplateProps } from "@/types/template-props";
import { EditableText } from "../shared/editable-text/EditableText";
import { RegenerateButton } from "../shared/regenerate-button/RegenerateButton";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item} className="text-xs">
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

export const NewspaperTemplate = ({ resume, onRegenerateSection, onRephraseSection, readonly = false }: TemplateProps) => {
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
    <div className="flex-1 flex flex-col bg-white border border-gray-300 overflow-auto relative p-6 font-lora">
      <div className="flex flex-col items-center justify-center py-[30px]">
        <h2 className="font-bold text-3xl">{fullName}</h2>
        <div className="my-3 text-gray-800">
          {Title("Contact")}
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span>Phone Number: {phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>Email: {email}</span>
          </div>
        </div>
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
      <div className="flex flex-1">
        <div className="left flex-[2] pt-[20px] pr-5">
          <div className="mb-3">
            {Title('Skills')}
            {List(skills)}
          </div>
          {HorizontalDivider}
          <div className="mb-3 mt-3">
            {Title('Education', { onRegenerate: () => onRegenerateSection('educations') })}
            <EditableText
              className="text-xs"
              readonly={readonly}
              onChange={newValue => onRephraseSection('educations', newValue)}>
            {/* {formattedEducations.join("\n")} */}
            </EditableText>
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
            <EditableText
              className="text-xs"
              readonly={readonly}
              onChange={newValue => onRephraseSection('experiences', newValue)}>
              {/* {formattedExperiences.join("\n")} */}
            </EditableText>
          </div>
        </div>
      </div>
    </div>
  );
};
