import React from "react";
import "./ViewCV.css";
import generatePdf from "@/utils/generatePdf";
import { useLocation } from "react-router-dom";

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

  console.log("Viewing Resume Text:", resumeText);

  const handleDownload = () => {
    // Generate PDF using the processed and formatted text
    generatePdf(processedResumeText);
  };

  return (
    <div className="resume-preview-container">
      <h1 className="title">Your CV is ready!</h1>
      <button className="download-button" onClick={handleDownload}>
        DOWNLOAD
      </button>
      <div className="resume-preview">
        <pre
          className="resume-text"
          dangerouslySetInnerHTML={{ __html: processedResumeText }}
        ></pre>
      </div>
    </div>
  );
};

export default ViewCV;
