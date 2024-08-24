import { LANGUAGE_LEVEL_NAME } from "@/types/language-knowledge";
import { SKILL_LEVEL_NAME } from "@/types/skill";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { generatePreviewUrl } from "../../../../services/cvService";
import {
  emailState,
  fullNameState,
  jobTitleState,
  languagesState,
  phoneNumberState,
  skillsState,
  templateState,
} from "../store/state";

const ViewCV: React.FC = () => {
  const location = useLocation();
  const { resumeText } = location.state || {};
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const fullName = useRecoilValue(fullNameState);
  const email = useRecoilValue(emailState);
  const phoneNumber = useRecoilValue(phoneNumberState)
  const jobTitle = useRecoilValue(jobTitleState);
  const userSkills = useRecoilValue(skillsState);
  const userLanguages = useRecoilValue(languagesState);
  const template = useRecoilValue(templateState);

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
        email,
        phoneNumber,
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
              `${languagesState.lang} - ${LANGUAGE_LEVEL_NAME[languagesState.level]
              }`
          )
          .join("\n"),
        template,
        "en"
      );
      const { url } = response.data;
      setPdfUrl(url);
    } catch (error) {
      console.error("Error fetching PDF preview:", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      {pdfUrl ? (
        <embed
          id="previewCV"
          src={pdfUrl}
          type="application/pdf"
          width="100%"
          height="100%"
        />
      ) : (
        <p>Loading Preview..</p> // TODO
      )}
    </div>
  );
};

export default ViewCV;
