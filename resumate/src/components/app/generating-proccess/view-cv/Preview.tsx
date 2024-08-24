import { Button } from "@/components/shared/button/Button";
import { PremiumBadge } from "@/components/shared/premium-badge/PremiumBadge";
import { generateSection } from "@/services/GenerateResume";
import { templates } from "@/services/templateService";
import { translateCV } from "@/services/translateCV";
import { isUserPremiumSelector, userState } from "@/store/atoms/userAtom";
import { ResumeSections } from "@/types/resume";
import { debounce } from "lodash";
import { cloneElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { downloadPDF, previewCV, upsertResume } from "../../../../services/cvService";
import { educationState, experienceState, fullNameState, jobTitleState, languagesState, skillsState, summaryState, templateState } from "../store/state";
import "./Preview.css";

type PreviewProps = {
  id?: string;
  readonly?: boolean;
};

const Preview = ({ id: proppedId, readonly = false }: PreviewProps) => {
  const { id } = useParams<{ id: string }>();
  const user = useRecoilValue(userState);
  const isPremiumUser = useRecoilValue(isUserPremiumSelector);

  const resetName = useResetRecoilState(fullNameState);
  const resetJobTitle = useResetRecoilState(jobTitleState);
  const resetBio = useResetRecoilState(summaryState);
  const resetEducation = useResetRecoilState(educationState);
  const resetExperience = useResetRecoilState(experienceState);
  const resetLanguages = useResetRecoilState(languagesState);
  const resetTemplate = useResetRecoilState(templateState);
  const resetSkills = useResetRecoilState(skillsState)

  const [fullName, setFullName] = useState<string>("Full Name");
  const [jobTitle, setJobTitle] = useState<string>("Job Title");
  const [bio, setBio] = useState<string>(
    "A brief bio about yourself goes here."

  );

  const [selectedTemplate, setSelectedTemplate] = useRecoilState(templateState);

  const [skills, setSkills] = useState<string>("Skills");
  const [experiences, setExperiences] = useState<string>("Experience");
  const [educations, setEducations] = useState<string>("Educations");
  const [languages, setLanguages] = useState<string>("Language 1, Language 2");
  const [languageTo, setLanguageTo] = useState("en");
  const [languageFrom, setLanguageFrom] = useState("en");

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Rephrasing

  const handleRephrasing = (section: keyof ResumeSections, newValue: string) => {
    switch (section) {
      case "bio":
        setBio(newValue);
        break;
      case 'educations':
        setEducations(newValue);
        break;
      case 'experiences':
        setExperiences(newValue);
        break;
    }
  }

  // Translate

  const handleTranslate = async () => {
    const resumeSections: ResumeSections = {
      fullName,
      jobTitle,
      bio,
      skills,
      experiences,
      educations,
      languages,
      template: selectedTemplate,
      resumeLanguage: languageTo
    };

    const translatedResume = await translateCV(resumeSections, languageFrom, languageTo);
    setFullName(translatedResume.fullName)
    setJobTitle(translatedResume.jobTitle)
    setBio(translatedResume.bio)
    setExperiences(translatedResume.experiences)
    setEducations(translatedResume.educations)
    setSkills(translatedResume.skills)
    setLanguages(translatedResume.languages)
    setLanguageFrom(languageTo);
  };

  // Regenerate

  const handleRegenerate = (section: keyof ResumeSections) => {
    let currentSectionValue = '';

    switch (section) {
      case "bio":
        currentSectionValue = bio;
        break;
      case 'educations':
        currentSectionValue = educations;
        break;
      case 'experiences':
        currentSectionValue = experiences;
        break;
    }

    regenerateSection(section, currentSectionValue);
  }

  const regenerateSection = async (
    section: keyof ResumeSections,
    existSectionData: string
  ) => {
    try {
      const response = await generateSection({ data: existSectionData });
      const updatedSectionText = response.data.replace(/^[^\:]*:\s*/, "");

      if (updatedSectionText !== "" && updatedSectionText !== ".") {
        switch (section) {
          case "bio":
            setBio(updatedSectionText);
            break;
          case "educations":
            setEducations(updatedSectionText);
            break;
          case "experiences":
            setExperiences(updatedSectionText);
            break;
        }
      } else {
        toast.error(
          "Sorry, we encounter too many requests from your user. Please try again in 30 seconds"
        );
      }
    } catch (error) {
      console.error("Error regenerating section:", error);
    }
  };

  // Toolbar Actions

  const saveResume = async () => {
    setIsSaving(true);

    try {
      const cvData = {
        resumePreviewId: id,
        fullName,
        jobTitle,
        bio: bio,
        skills: skills,
        experiences: experiences,
        educations: educations,
        languages: languages,
        template: selectedTemplate,
        resumeLanguage: languageTo
      };

      await upsertResume(user._id, cvData);
      toast.success('Saved resume draft')
    } catch (er) {
      toast.error('Failed saving resume')
    } finally {
      setIsSaving(false);
    }

  };

  const downloadResume = async () => {
    setIsDownloading(true);

    try {
      await downloadPDF(
        `${import.meta.env.VITE_API_BASE_URL
        }/preview/${id}/download`,
        resumeDownloadFileName
      )
      toast.success('Resume downloaded succesfully')
    } catch (er) {
      toast.error('Failed downloading resume')
    } finally {
      setIsDownloading(false);
    }
  }

  const resumeDownloadFileName = fullName
    ? `${fullName.replace(/ /g, "_")}-Resume.pdf`
    : "Resume.pdf";

  useEffect(() => {
    const resumeId = proppedId || id;

    const fetchData = async () => {
      if (resumeId) {
        setIsLoading(true);

        try {
          const response = await previewCV(resumeId);
          const data = response.data;

          setFullName(data.fullName);
          setJobTitle(data.jobTitle);
          setBio(data.bio.replace(/^[^\n]*:\s*"?([^"]*)"?$/, "$1"));
          setSkills(data.skills);
          setExperiences(
            data.experiences.replace(/^[^\n]*:\s*"?([^"]*)"?$/, "$1")
          );
          setEducations(
            data.educations.replace(/^[^\n]*:\s*"?([^"]*)"?$/, "$1")
          );
          setLanguages(data.languages);
          setLanguageTo(data.resumeLanguage || "en");
          setLanguageFrom(data.resumeLanguage || "en");
          if (data.template) {
            setSelectedTemplate(data.template || 1)
          }
        } catch (error) {
          toast.error("Sorry, we encountered some issues");
        } finally {
          setIsLoading(false)
        }
      }
    };

    if (resumeId != "") {
      fetchData();
    }
  }, [id, proppedId]);


  useEffect(() => {
    return () => {
      resetName();
      resetBio();
      resetEducation();
      resetExperience();
      resetJobTitle();
      resetLanguages();
      resetSkills();
      resetTemplate();
    }
  }, [])

  const currentTemplate = templates.find(tmp => tmp._id === selectedTemplate);

  return (
    <div className="w-full flex space-x-8 flex-1 overflow-hidden" style={{ maxHeight: "100vh" }}>
      {!readonly && (
        <div className="translate w-[400px] border border-gray-300 bg-white rounded-lg overflow-hidden">
          <div className="px-6 py-4 flex flex-col divide-y gap-5">
            <div className="flex flex-col gap-2">
              <Button
                onClick={saveResume}
                loading={isSaving}
                style={{ marginTop: 20 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
                Save Resume
              </Button>
              <Button
                variant='outlined'
                loading={isDownloading}
                onClick={downloadResume}
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
                Download
              </Button>
            </div>
            <div className="flex flex-col pt-4 ">
              <h2 className="text-md font-semibold text-gray-800 flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                Language
              </h2>
              <div className="flex flex-col relative">
                {!isPremiumUser &&
                  <div className="absolute top-0 left-0 w-[100%] h-[100%] pb-[17px] flex items-center justify-center" style={{ backdropFilter: "blur(2px)" }}>
                    <PremiumBadge text="Premium Feature" />
                  </div>}
                <div className="mt-4">
                  <select
                    id="language-select"
                    value={languageTo}
                    onChange={(e) => setLanguageTo(e.target.value)}
                    className="block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="it">Italian</option>
                  </select>
                </div>
                <Button buttonClassName="mt-4" variant='outlined' onClick={handleTranslate}>Translate</Button>
              </div>

            </div>
          </div>
        </div>
      )}
      <div className="preview flex" style={{ aspectRatio: "1/1.41", height: '100%' }}>
        {cloneElement(currentTemplate!.component({
          resume: { bio, educations, experiences, fullName, jobTitle, languages, skills, template: selectedTemplate, resumeLanguage: languageFrom },
          onRegenerateSection: handleRegenerate,
          onRephraseSection: debounce(handleRephrasing, 1000),
          readonly
        }))}
      </div>
    </div>
  );
};

export default Preview;
