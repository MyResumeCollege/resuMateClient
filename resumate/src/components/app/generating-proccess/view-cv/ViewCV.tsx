import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  generatePreviewUrl,
  handleDownloadCV,
} from "../../../../services/cvPreview";
import {
  educationState,
  fullNameState,
  jobTitleState,
  languagesState,
  skillsState,
  summaryState,
} from "../store/state";
import { Button } from "@/components/shared/button/Button";
import { SKILL_LEVEL_NAME } from "@/types/skill";
import { LANGUAGE_LEVEL_NAME } from "@/types/language-knowledge";
import { userIdSelector } from "@/store/atoms/userAtom";
import { cvSave } from "../../../../services/cvSave";

const ViewCV: React.FC = () => {
  const location = useLocation();
  const { resumeText } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const userId = useRecoilValue(userIdSelector);
  const fullName = useRecoilValue(fullNameState);
  const jobTitle = useRecoilValue(jobTitleState);
  const userSkills = useRecoilValue(skillsState);
  const userLanguages = useRecoilValue(languagesState);
  const userEducation = useRecoilValue(educationState);
  const userBio = useRecoilValue(summaryState);

  const fileName = fullName
    ? `${fullName.replace(/ /g, "_")}-Resume.pdf`
    : "Resume.pdf";

  useEffect(() => {
    if (resumeText) previewPdf(resumeText[0], resumeText[1], resumeText[2]);
  }, [resumeText]);

  const previewPdf = async (
    bio: string,
    experiences: string,
    educations: string
  ) => {
    try {
      const response = await generatePreviewUrl(
        fullName,
        jobTitle,
        bio,
        userSkills
          .map((skill) => `${skill.name} - ${SKILL_LEVEL_NAME[skill.level]}`)
          .join("\n"),
        experiences,
        educations,
        userLanguages
          .map(
            (languagesState) =>
              `${languagesState.lang} - ${
                LANGUAGE_LEVEL_NAME[languagesState.level]
              }`
          )
          .join("\n")
      );
      const { url } = response.data;
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF preview:", error);
    }
  };

  const downloadPDF = async () => {
    try {
      const response = await handleDownloadCV(pdfUrl);
      if (response instanceof Blob) {
        const downloadUrl = window.URL.createObjectURL(response);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } else console.error("Response is not a Blob");
    } catch (error) {
      console.error("Error downloading the PDF:", error);
    }
  };

  const saveDraft = async () => {
    const cvData = {
      ownerId: userId,
      fullName,
      jobTitle,
      userBio,
      userSkills,
      userEducation,
      userLanguages,
    };
    console.log("my data:", cvData);
    // const response = await cvSave(cvData);
    //console.log("Draft saved successfully:", response);
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <h1 className="font-bold text-3xl mb-[20px]">Your Resume is Ready!</h1>
      <Button
        onClick={downloadPDF}
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
      <Button
        onClick={saveDraft}
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
        Save Draft
      </Button>
      {pdfUrl ? (
        <embed
          id="previewCV"
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      ) : (
        <p>Loading Preview..</p>
      )}
    </div>
  );
};

export default ViewCV;
