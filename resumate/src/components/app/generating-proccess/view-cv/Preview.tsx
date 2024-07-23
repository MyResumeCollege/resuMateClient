import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { translateCV } from '@/services/translateCV'
import jsPDF from 'jspdf'

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

  const [language, setLanguage] = useState('')

  //   const handleTranslate = async () => {
  //     try {
  //       const resumeText = `${bio} + ${skills} + ${experiences}`
  //       const translatedText = await translateCV(resumeText, language)
  //       console.log(translatedText)
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  const handleTranslate = async () => {
    try {
      // Combine your resume content into a single string
      const resumeText = `${fullName}\n${jobTitle}\n${bio}\nExperiences: ${experiences.join(
        ', '
      )}\nSkills: ${skills.join(', ')}`

      // Create a Blob from the resume text
      const resumeBlob = new Blob([resumeText], { type: 'text/plain' })

      // Convert the Blob into a File
      const resumeFile = new File([resumeBlob], 'resume.txt', {
        type: 'text/plain',
      })

      // Call the translateCV function with the File and language
      const response = await translateCV(resumeFile, language)

      // Assuming the response contains the translated text
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }
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
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Enter language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <button
          onClick={handleTranslate}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Translate
        </button>
      </div>
    </div>
  )
}

export default Preview
