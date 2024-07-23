import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { translateCV } from '@/services/translateCV';

const Preview: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);

  const fullName = query.get('fullName') || 'Default Name';
  const jobTitle = query.get('jobTitle') || 'Job Title';
  const bio = query.get('bio') || 'A brief bio about yourself goes here.';
  const experiences = query.get('experiences')?.split(',') || [
    'Experience 1',
    'Experience 2',
  ];
  const skills = query.get('skills')?.split(',') || ['Skill 1', 'Skill 2'];
  const [resumeLanguage, setLanguage] = useState('');
  const [translatedResume, setTranslatedResume] = useState<string | null>(null);

  // const navigate = useNavigate();

  const handleTranslate = async () => {
    if (!resumeLanguage) {
      console.error('Please enter a language for translation.');
      return;
    }

    try {
      // Call the translation service
      const translateResume = await translateCV({
        bio,
        skills,
        experiences,
        resumeLanguage,
      });

      const resumeText = translateResume.data.translatedCV.join('\n');
      console.log('Translated resume:', resumeText);
      setTranslatedResume(resumeText);
    } catch (error) {
      console.error('Error translating resume:', error);
    }
  };
  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-10'>
      <div className='w-full max-w-6xl bg-white border border-gray-300 p-8 flex space-x-8'>
        <div className='w-1/3 bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='px-6 py-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              Translate Your Resume
            </h2>
            <div className='mt-4'>
              <label
                htmlFor='language-select'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Select Language:
              </label>
              <select
                id='language-select'
                value={resumeLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                className='block w-full border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='' disabled>
                  Choose...
                </option>

                <option value='spanish'>Spanish</option>
                <option value='french'>French</option>
                <option value='german'>German</option>
                <option value='italian'>Italian</option>
                <option value='portuguese'>Portuguese</option>
                <option value='dutch'>Dutch</option>
              </select>
            </div>
            <div className='mt-6'>
              <button
                onClick={handleTranslate}
                className='w-full bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
              >
                Translate
              </button>
            </div>
          </div>
        </div>

        <div className='w-2/3 bg-white border border-gray-300 p-8'>
          {translatedResume ? (
            <>
              <div className='text-3xl font-bold mb-1'>{fullName}</div>
              <div className='text-sm text-gray-600 mb-1'>{jobTitle}</div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Summary
                </h2>
                <p className='text-sm'>{translatedResume}</p>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Experience
                </h2>
                <div className='mb-2'>
                  <div className='font-semibold'>Company Name</div>
                  <div className='text-sm'>Title</div>
                  <div className='text-xs text-gray-500'>
                    Location • Date period
                  </div>
                  <ul className='list-disc pl-5 text-sm mt-1'></ul>
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Skills
                </h2>
                <div className='flex flex-wrap text-sm'></div>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Education
                </h2>
                <div>
                  <div className='font-semibold'></div>
                  <div className='text-sm'></div>
                  <div className='text-xs text-gray-500'></div>
                </div>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Training / Courses
                </h2>
                <div className='text-sm'></div>
              </div>

              <div>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Passions
                </h2>
                <div className='text-sm whitespace-pre-line'></div>
              </div>
            </>
          ) : (
            <>
              <div className='text-3xl font-bold mb-1'>{fullName}</div>
              <div className='text-sm text-gray-600 mb-1'>{jobTitle}</div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Summary
                </h2>
                <p className='text-sm'>{bio}</p>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Experience
                </h2>
                <div className='mb-2'>
                  <div className='font-semibold'>Company Name</div>
                  <div className='text-sm'>Title</div>
                  <div className='text-xs text-gray-500'>
                    Location • Date period
                  </div>
                  <ul className='list-disc pl-5 text-sm mt-1'>
                    {experiences.map((exp, index) => (
                      <li key={index}>{exp}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Skills
                </h2>
                <div className='flex flex-wrap text-sm'>
                  {skills.map((skill, index) => (
                    <span key={index} className='mr-4 mb-1'>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Education
                </h2>
                <div>
                  <div className='font-semibold'></div>
                  <div className='text-sm'></div>
                  <div className='text-xs text-gray-500'></div>
                </div>
              </div>

              <div className='mb-4'>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Training / Courses
                </h2>
                <div className='text-sm'></div>
              </div>

              <div>
                <h2 className='text-lg font-semibold border-b border-gray-300 pb-1 mb-2'>
                  Passions
                </h2>
                <div className='text-sm whitespace-pre-line'></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Preview;
