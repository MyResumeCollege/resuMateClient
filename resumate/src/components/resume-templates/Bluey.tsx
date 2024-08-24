import { TemplateProps } from "@/types/template-props";
import { RegenerateButton } from "../shared/regenerate-button/RegenerateButton";

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item} className="text-sm">
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

export const BlueyTemplate = ({ resume, onRegenerateSection, onRephraseSection, readonly }: TemplateProps) => {
  const {
    fullName,
    bio,
    jobTitle,
    languages,
    skills,
    educations,
    experiences,
  } = resume;

  const Title = (text: string, options?: { color?: string, onRegenerate?: () => void }) => {
    const selectedColor = options?.color || 'white';

    return (
      <div className="flex flex-col mb-3">
        <h2 className="text-lg font-bold" style={{ color: selectedColor }}>
          {text}
          {options?.onRegenerate && !readonly &&
            <RegenerateButton
              onClick={options.onRegenerate}
              style={{ marginLeft: 10 }}
              mode={selectedColor === 'white' ? 'white' : 'primary'}
            />}
        </h2>
        <span className="h-[1px] w-full" style={{ background: selectedColor }}></span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative">
      <div className="bg-primary p-8 pr-0 text-white" style={{ maxWidth: 300 }}>
        <div
          className="text-3xl font-bold pr-6"
        >
          {fullName}
        </div>
        <div
          className="text-sm font-semibold mb-[40px] text-gray-800"
        >
          {jobTitle}
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Education", { onRegenerate: () => onRegenerateSection('educations') })}
          <div
            className="text-sm pr-6 whitespace-break-spaces"
            contentEditable={!readonly}
            suppressContentEditableWarning
            onInput={e => onRephraseSection('educations', e.currentTarget.textContent || '')}
          >
            {educations.slice(0, 400)}
          </div>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Skills")}
          <div >
            {List(skills)}
          </div>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Languages")}
          <div>
            {List(languages)}
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 text-sm">
        <div className="flex flex-col mb-5">
          {Title("About Me", { color: 'black', onRegenerate: () => onRegenerateSection('bio') })}
          <div contentEditable={!readonly} suppressContentEditableWarning onInput={e => onRephraseSection('bio', e.currentTarget.textContent || '')}>
            {bio.slice(0, 400)}
          </div>
        </div>
        <div className="text-sm">
          {Title("Experience", { color: 'black', onRegenerate: () => onRegenerateSection('experiences') })}
          <div contentEditable={!readonly} suppressContentEditableWarning onInput={e => onRephraseSection('experiences', e.currentTarget.textContent || '')}>
            {experiences.slice(0, 400)}
          </div>
        </div>
      </div>
    </div >
  );
};
