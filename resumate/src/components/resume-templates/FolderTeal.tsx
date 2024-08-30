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

export const FolderTealTemaplate = ({
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

  return (
    <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative">
      <div className="left p-6 flex-1 flex flex-col">
        <div className="my-3">
          {Title("Experience", {
            onRegenerate: () => onRegenerateSection("experiences"),
          })}
          <EditableText
            className="text-xs"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("experiences", newValue)}
          >
            {/* {formattedExperiences.join("\n")} */}
          </EditableText>
        </div>
        <div className="my-3">
          {Title("Education", {
            onRegenerate: () => onRegenerateSection("educations"),
          })}
          <EditableText
            className="text-xs"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("educations", newValue)}
          >
            {/* {formattedEducations.join("\n")} */}
          </EditableText>
        </div>
        <div className="my-3">
          {Title("Skills")}
          {List(skills)}
        </div>
      </div>
      <div className="right p-6 bg-[#9b948e] w-[300px] text-white text-xs">
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
