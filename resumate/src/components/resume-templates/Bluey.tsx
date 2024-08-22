import { TemplateProps } from "@/types/template-props";

const Title = (text: string, color = "white") => {
  return (
    <div className="flex flex-col mb-3">
      <h2 className="text-lg font-bold" style={{ color }}>
        {text}
      </h2>
      <span className="h-[1px] w-full" style={{ background: color }}></span>
    </div>
  );
};

const List = (listedText: string) => {
  return (listedText || "").split("\n").map((item) => (
    <div key={item} className="text-sm">
      <span className="font-bold">{item.split("-")[0]}</span> -
      <span>{item.split("-")[1]}</span>
    </div>
  ));
};

// const EducationList = (education: string) => {
//     return (education || "").split('\n').filter(item => item !== '')
//         .map(item => <div key={item} className="text-sm text-gray-600 mb-4">
//             <span className="font-bold">{item.split('-')[0]}</span>
//             <span>{item.split('-')[1]}</span>
//         </div>)
// }

export const BlueyTemplate = ({ resume }: TemplateProps) => {
  const {
    fullName,
    bio,
    jobTitle,
    languages,
    skills,
    educations,
    experiences,
  } = resume;

  return (
    <div className="flex-1 flex bg-white border border-gray-300 overflow-auto relative">
      <div className="bg-primary p-8 pr-0 text-white" style={{ maxWidth: 300 }}>
        <div
          className="text-3xl font-bold pr-6"
          contentEditable
          suppressContentEditableWarning
        >
          {fullName}
        </div>
        <div
          className="text-sm font-semibold mb-[40px] text-gray-800"
          contentEditable
          suppressContentEditableWarning
        >
          {jobTitle}
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Education")}
          <div
            className="text-sm pr-6 whitespace-break-spaces"
            contentEditable
            suppressContentEditableWarning
          >
            {educations.slice(0, 400)}
          </div>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Skills")}
          <div contentEditable suppressContentEditableWarning>
            {List(skills)}
          </div>
        </div>

        <div className="flex flex-col mb-5 text-gray-800">
          {Title("Languages")}
          <div contentEditable suppressContentEditableWarning>
            {List(languages)}
          </div>
        </div>
      </div>
      <div className="flex-1 p-6 text-sm">
        <div className="flex flex-col mb-5">
          {Title("About Me", "black")}
          <div contentEditable suppressContentEditableWarning>
            {bio.slice(0, 400)}
          </div>
        </div>
        <div className="text-sm">
          {Title("Experience", "black")}
          <div contentEditable suppressContentEditableWarning>
            {experiences.slice(0, 400)}
          </div>
        </div>
      </div>
    </div>
  );
};
