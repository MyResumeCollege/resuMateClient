import { TemplateProps } from "@/types/template-props";
import { EditableText } from "../shared/editable-text/EditableText";
import { RegenerateButton } from "../shared/regenerate-button/RegenerateButton";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useFormattedData } from "@/hooks/useFormattedData";

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item}>
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

export const SeaTemplate = ({
  resume,
  onRegenerateSection,
  onRephraseSection,
  readonly = false,
}: TemplateProps) => {
  const {
    fullName,
    phoneNumber,
    email,
    bio,
    jobTitle,
    languages,
    skills,
    educations,
    experiences,
  } = resume;

  const { formattedExperiences, formattedEducations } = useFormattedData(
    experiences,
    educations
  );

  const Title = (
    text: string,
    options?: { color?: string; onRegenerate?: () => void }
  ) => {
    const selectedColor = options?.color || "white";

    return (
      <div className="flex flex-col mb-3">
        <h2 className="text-lg font-bold" style={{ color: selectedColor }}>
          {text}
          {options?.onRegenerate && !readonly && (
            <RegenerateButton
              onClick={options.onRegenerate}
              style={{ marginLeft: 10 }}
              mode={selectedColor === "white" ? "white" : "primary"}
            />
          )}
        </h2>
        <span
          className="h-[1px] w-full"
          style={{ background: selectedColor }}
        ></span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative text-xs">
      <div className="bg-primary p-8 pr-0 text-white" style={{ maxWidth: 300 }}>
        <div className="text-3xl font-bold pr-6">{fullName}</div>
        <div className="text-sm font-semibold mb-[40px] text-gray-800">
          {jobTitle}
        </div>
        <div className="my-3">
          {Title("Contact Info")}
          <div className="flex items-center">
            <FaPhoneAlt className="mr-2" />
            <span>{phoneNumber}</span>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <span>{email}</span>
          </div>
        </div>
        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Education", {
            onRegenerate: () => onRegenerateSection("educations"),
          })}
          <EditableText
            className="pr-6 whitespace-break-spaces"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("educations", newValue)}
          >
            {formattedEducations.join("\n")}
          </EditableText>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Skills")}
          <div>{List(skills)}</div>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Languages")}
          <div>{List(languages)}</div>
        </div>
      </div>
      <div className="flex-1 p-6">
        <div className="flex flex-col mb-5">
          {Title("About Me", {
            color: "black",
            onRegenerate: () => onRegenerateSection("bio"),
          })}
          <EditableText
            className="pr-6 whitespace-break-spaces"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("bio", newValue)}
          >
            {bio.slice(0, 400)}
          </EditableText>
        </div>
        <div>
          {Title("Experience", {
            color: "black",
            onRegenerate: () => onRegenerateSection("experiences"),
          })}
          <EditableText
            className="pr-6 whitespace-break-spaces"
            readonly={readonly}
            onChange={(newValue) => onRephraseSection("experiences", newValue)}
          >
            {formattedExperiences.join("\n")}
          </EditableText>
        </div>
      </div>
    </div>
  );
};
