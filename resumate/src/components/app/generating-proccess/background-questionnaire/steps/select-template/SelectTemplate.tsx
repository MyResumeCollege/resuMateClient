import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

import template1Image from "@/assets/images/resume-template/template1.jpg";
import template2Image from "@/assets/images/resume-template/template2.jpg";
import template3Image from "@/assets/images/resume-template/template3.jpg";
import template4Image from "@/assets/images/resume-template/template4.jpg";
import template5Image from "@/assets/images/resume-template/template5.jpg";

export const SelectTemplate = () => {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const templates = [
    { id: "template1", imageUrl: template1Image },
    { id: "template2", imageUrl: template2Image },
    { id: "template3", imageUrl: template3Image },
    { id: "template4", imageUrl: template4Image },
    { id: "template5", imageUrl: template5Image },
  ];

  const generateCV = () => {
    navigate("/build-cv/generate");
  };

  const selectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const nextTemplates = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === templates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTemplates = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? templates.length - 1 : prevIndex - 1
    );
  };

  const visibleTemplates = [
    templates[(currentIndex - 1 + templates.length) % templates.length],
    templates[currentIndex],
    templates[(currentIndex + 1) % templates.length],
  ];

  return (
    <section className="select-template flex-1 flex flex-col items-center pt-[50px]">
      <h2 className="font-bold text-3xl text-center mb-5">
        Select Your Template
      </h2>
      <div className="skip-step text-center mb-5">
        <button
          className="text-blue-500 underline"
          onClick={() => generateCV()}
        >
          Skip this step
        </button>
      </div>
      <div className="templates-container flex items-center">
        <button className="arrow left-arrow" onClick={prevTemplates}>
          <GoTriangleLeft size={26} />
        </button>
        <div className="templates flex gap-2">
          {visibleTemplates.map((template) => (
            <div
              key={template.id}
              className={`template w-[180px] h-[250px] border ${
                selectedTemplate === template.id
                  ? "border-blue-500"
                  : "border-gray-300"
              } p-1 flex-shrink-0`}
              onClick={() => selectTemplate(template.id)}
            >
              <img
                src={template.imageUrl}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <button className="arrow right-arrow" onClick={nextTemplates}>
          <GoTriangleRight size={26} />
        </button>
      </div>
    </section>
  );
};
