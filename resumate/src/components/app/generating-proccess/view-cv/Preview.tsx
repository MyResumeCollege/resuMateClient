import { translateCV } from "@/services/translateCV";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { previewCV } from "../../../../services/cvService";
import { generateSection } from "@/services/GenerateResume";
import { upsertResume } from "../../../../services/cvService";
import { userIdSelector, userState } from "@/store/atoms/userAtom";

import "./Preview.css";
import Section from "@/components/shared/section/Section";
import { useRecoilValue } from "recoil";
import { Button } from "@/components/shared/button/Button";

type PreviewProps = {
  id?: string;
  readonly?: boolean;
};

const Preview = ({ id: proppedId, readonly = false }: PreviewProps) => {
  const { id } = useParams<{ id: string }>();
  const user = useRecoilValue(userState);
  const [fullName, setFullName] = useState<string>("Full Name");
  const [jobTitle, setJobTitle] = useState<string>("Job Title");
  const [bio, setBio] = useState<string>(
    "A brief bio about yourself goes here."
  );
  const [skills, setSkills] = useState<string>("Skills");
  const [experiences, setExperiences] = useState<string>("Experience");
  const [educations, setEducations] = useState<string>("Educations");
  const [languages, setLanguages] = useState<string>("Language 1, Language 2");
  const [resumeLanguage, setLanguage] = useState("");
  const [translatedResume, setTranslatedResume] = useState<string | null>(null);

  useEffect(() => {
    const resumeId = proppedId || id;

    const fetchData = async () => {
      if (resumeId) {
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
        } catch (error) {
          console.log(error);
          toast.error("Sorry, we encountered some issues");
        }
      }
    };

    if (resumeId != "") {
      fetchData();
    }
  }, [id, proppedId]);

  const handleTranslate = async () => {
    if (!resumeLanguage) {
      console.error("Please enter a language for translation.");
      return;
    }

    try {
      const translateResume = await translateCV({
        bio,
        skills,
        experiences,
        resumeLanguage,
      });

      const resumeText = translateResume.data;
      // TODO split to sections
    } catch (error) {
      console.error("Error translating resume:", error);
    }
  };

  const handleRegenerate = async (
    section: string,
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
          case "education":
            setEducations(updatedSectionText);
            break;
          case "experience":
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

  const saveResume = async () => {    
    const cvData = {
      resumePreviewId: id,
      fullName,
      jobTitle,
      bio: bio,
      skills: skills,
      experiences: experiences,
      educations: educations,
      languages: languages,
    };
    
    await upsertResume(user._id, cvData);
  };

  return (
    <div className="w-full max-w-6xl flex space-x-8 flex-1">
      {!readonly && (
        <div className="translate w-1/3 border border-gray-300 bg-white rounded-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Translate Your Resume
            </h2>
            <div className="mt-4">
              <label
                htmlFor="language-select"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Language:
              </label>
              <select
                id="language-select"
                value={resumeLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className="block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose...
                </option>

                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="italian">Italian</option>
                <option value="portuguese">Portuguese</option>
                <option value="dutch">Dutch</option>
              </select>
            </div>
            <div className="mt-6">
              <Button onClick={handleTranslate}>Translate</Button>
              <Button
                onClick={saveResume}
                style={{ width: "fit-content", marginTop: 20 }}
              >
                Save Resume
              </Button>
            </div>
          </div>
        </div>
      )}
      <div className="flex-1 bg-white border border-gray-300 p-8">
        <div className="text-3xl font-bold mb-1">{fullName}</div>
        <div className="text-sm text-gray-600 mb-1">{jobTitle}</div>

        <Section
          title="Summary"
          onRegenerate={() => handleRegenerate("bio", bio)}
        >
          <p className="text-sm">{bio}</p>
        </Section>

        <Section
          title="Experience"
          onRegenerate={() => handleRegenerate("experience", experiences)}
        >
          <div className="mb-2">
            <ul className="list-disc text-sm mt-1">{experiences}</ul>
          </div>
        </Section>

        <Section title="Skills">
          <div className="text-sm whitespace-pre-line">{skills}</div>
        </Section>

        <Section
          title="Education"
          onRegenerate={() => handleRegenerate("education", educations)}
        >
          <div className="flex flex-wrap text-sm">{educations}</div>
        </Section>

        <Section title="Languages">
          <div className="text-sm whitespace-pre-line">{languages}</div>
        </Section>
      </div>
    </div>
  );
};
export default Preview;
