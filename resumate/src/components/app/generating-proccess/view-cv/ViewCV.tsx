import React from "react";
import "./ViewCV.css";
import generatePdf from "@/utils/generatePdf";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/shared/button/Button";

const processResumeText = (text: string) => {
  // Replace **text** with <b>text</b>
  text = text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

  // Replace [some title]: with <b>some title</b>:
  text = text.replace(/\[(.*?)\]:/g, "<b>$1</b>:");

  // Find the position of the first appearance of "name"
  const firstNameIndex = text.toLowerCase().indexOf("name");

  // If "name" is found, remove everything before it
  if (firstNameIndex !== -1) {
    text = text.substring(firstNameIndex);
  }
  text = text.replace(/\bname\b/gi, "<b>Name</b>");
  return text;
};

const ViewCV: React.FC = () => {
  const location = useLocation();
  const { resumeText } = location.state || {};
  const processedResumeText = processResumeText(resumeText);

  const handleDownload = () => {
    generatePdf(processedResumeText);
  };

  return (
    <div className="flex flex-col flex-1 items-center pt-[50px]">
      <h1 className="font-bold text-3xl mb-[20px]">Your Resume is Ready!</h1>
      <Button onClick={handleDownload} style={{ width: "fit-content", marginBottom: 20 }}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        Download Resume
      </Button>
      <div className="resume-preview flex-1">
        <pre
          className="resume-text"
          dangerouslySetInnerHTML={{ __html: processedResumeText }}
        ></pre>
      </div>
    </div>
  );
};

export default ViewCV;
