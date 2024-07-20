import React from "react";
import { useLocation } from "react-router-dom";

const Preview: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);
  
  const fullName = query.get("fullName") || "Default Name";
  const jobTitle = query.get("jobTitle") || "Job Title";
  const bio = query.get("bio") || "A brief bio about yourself goes here.";
  const languages = query.get("languages")?.split(",") || [
    "Language 1",
    "Language 2",
  ];
  const experiences = query.get("experiences")?.split(",") || [
    "Experience 1",
    "Experience 2",
  ];
  const skills = query.get("skills")?.split(",") || ["Skill 1", "Skill 2"];
  const contact = query.get("contact") || "No contact information available";

  return (
    <div className="flex flex-col lg:flex-row flex-1 items-start p-6 space-y-6 lg:space-y-0 lg:space-x-6">
      <div className="flex-1 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <div className="text-4xl font-bold mb-4">{fullName}</div>
        <div className="text-xl font-semibold mb-6">{jobTitle}</div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Bio</h2>
          <p className="text-base">{bio}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Experience</h2>
          <ul className="list-disc pl-5">
            {experiences.map((experience, index) => (
              <li key={index} className="mb-1">
                {experience}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-6 bg-purple-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-purple-800">Skills</h2>
          <ul className="list-disc pl-5 text-purple-600">
            {skills.map((skill, index) => (
              <li key={index} className="mb-1">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-100 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2 text-purple-800">Languages</h2>
          <ul className="list-disc pl-5 text-purple-600">
            {languages.map((language, index) => (
              <li key={index} className="mb-1">
                {language}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Contact Information
        </h2>
        <p className="text-base">{contact}</p>
      </div>
    </div>
  );
};

export default Preview;
