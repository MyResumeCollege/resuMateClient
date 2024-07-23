import React from 'react'
import { useLocation } from 'react-router-dom'

const Preview: React.FC = () => {
  const query = new URLSearchParams(useLocation().search)

  const fullName = query.get('fullName') || 'Default Name'
  const jobTitle = query.get('jobTitle') || 'Job Title'
  const bio = query.get('bio') || 'A brief bio about yourself goes here.'
  const experiences = query.get('experiences')?.split(',') || [
    'Experience 1',
    'Experience 2',
  ]
  const skills = query.get('skills')?.split(',') || ['Skill 1', 'Skill 2']

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10">
      <div className="w-full max-w-4xl bg-white border border-gray-300 p-8">
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
            <div className="font-semibold">Company Name</div>
            <div className="text-sm">Title</div>
            <div className="text-xs text-gray-500">Location • Date period</div>
            <ul className="list-disc pl-5 text-sm mt-1">
              {experiences.map((exp, index) => (
                <li key={index}>{exp}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap text-sm">
            {skills.map((skill, index) => (
              <span key={index} className="mr-4 mb-1">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Education
          </h2>
          <div>
            <div className="font-semibold"></div>
            <div className="text-sm"></div>
            <div className="text-xs text-gray-500"></div>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Training / Courses
          </h2>
          <div className="text-sm"></div>
        </div>

        <div>
          <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-2">
            Passions
          </h2>
          <div className="text-sm whitespace-pre-line"></div>
        </div>
      </div>
    </div>
  )
}

export default Preview
