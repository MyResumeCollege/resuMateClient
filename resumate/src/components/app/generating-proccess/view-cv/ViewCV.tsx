import React, { useEffect, useState } from "react";
import generatePdf from "@/utils/generatePdf";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/shared/button/Button";

const ViewCV: React.FC = () => {
  const location = useLocation();
  const { resumeText } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    if (resumeText) {
      const url = generatePdf(resumeText);
      setPdfUrl(url);
    }
  }, [resumeText]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col flex-1 items-center pt-[50px]">
      <h1 className="font-bold text-3xl mb-[20px]">Your Resume is Ready!</h1>
      <Button
        onClick={handleDownload}
        style={{ width: "fit-content", marginBottom: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        Download Resume
      </Button>
      {pdfUrl && (
        <iframe
          className="border-2 border-gray-300 rounded-lg shadow-lg"
          src={pdfUrl}
          width="70%"
          height="500px"
        ></iframe>
      )}
    </div>
  );
};

export default ViewCV;
