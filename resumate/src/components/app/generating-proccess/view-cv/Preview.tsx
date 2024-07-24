import React, { useState, useEffect } from "react";
import { translateCV } from "@/services/translateCV";
import { previewCV } from "../../../../services/cvPreview";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const Preview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [fullName, setFullName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("Job Title");
  const [bio, setBio] = useState<string>(
    "A brief bio about yourself goes here."
  );
  const [skills, setSkills] = useState<string>("Skills");
  const [experiences, setExperiences] = useState<string>("Experience");
  const [educations, setEducations] = useState<string>("Educations");
  const [languages, setLanguages] = useState<string>("Language 1, Language 2");

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await previewCV(id);
          const data = response.data;
          setFullName(data.fullName);
          setJobTitle(data.jobTitle);
          setBio(data.bio);
          setSkills(data.skills);
          setExperiences(data.experiences);
          setEducations(data.educations);
          setLanguages(data.languages);
        } catch (error) {
          toast.error("Sorry, we encountered some issues");
        }
      } else {
        toast.error("Sorry, we encountered some issues");
      }
    };

    if (id != "") {
      fetchData();
    }
  }, [id]);

  const [resumeLanguage, setLanguage] = useState("");
  const [translatedResume, setTranslatedResume] = useState<string | null>(null);

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

      const resumeText = translateResume.data.CVTextContent
      // TODO split to sections
    } catch (error) {
      console.error("Error translating resume:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
      <div className="w-full max-w-6xl bg-white border border-gray-300 p-8 flex space-x-8">
        <div className="w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
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
              <button
                onClick={handleTranslate}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Translate
              </button>
            </div>
          </div>
        </div>

        <div className="w-2/3 bg-white border border-gray-300 p-8">
              <div className="text-3xl font-bold mb-1">{fullName}</div>
              <div className="text-sm text-gray-600 mb-1">{jobTitle}</div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                  Summary
                </h2>
                <p className="text-sm">{bio}</p>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                  Experience
                </h2>
                <div className="mb-2">
                  <ul className="list-disc pl-5 text-sm mt-1">
                    {experiences}
                  </ul>
                </div>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                  Skills
                </h2>
                <div className="flex flex-wrap text-sm">
                  {skills}
                </div>
              </div>

              <div className="mb-4">
                <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="mb-2">
                  {educations}
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
                  Languages
                </h2>
                <div className="text-sm whitespace-pre-line">
                  {languages}
                  <br />
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};
export default Preview;
