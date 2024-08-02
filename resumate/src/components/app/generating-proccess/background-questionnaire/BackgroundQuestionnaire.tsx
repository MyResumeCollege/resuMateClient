import { useState, useEffect } from 'react'

import { Button } from '@/components/shared/button/Button'
import { useNavigate } from 'react-router-dom'
import { Stepper } from './stepper/Stepper'
import { Personal } from './steps/personal/Personal'
import { WantedJob } from './steps/wanted-job/WantedJob'
import { Skills } from './steps/skills/Skills'
import { Experience } from './steps/experience/Experience'
import { SelectTemplate } from './steps/select-template/SelectTemplate'
import { Education } from './steps/education/Education'
import { Languages } from './steps/languages/Languages'
import { useRecoilValue } from 'recoil'
import {
  fullNameState,
  jobTitleState,
  educationState,
  experienceState,
  languagesState,
  skillsState,
  summaryState,
} from '../store/state'
import toast from 'react-hot-toast'
import {
  validateEducationPeriods,
  validateExperiencePeriods,
  validateJobTitle,
  validateLanguages,
  validateNameAndBio,
  validateSkills,
} from '../../../../validations/validations'
type Step = {
  component: JSX.Element
  name: string
}

const useValidation = (currentStep: number): string[] => {
  const fullName = useRecoilValue(fullNameState)
  const jobTitle = useRecoilValue(jobTitleState)
  const bio = useRecoilValue(summaryState)
  const languages = useRecoilValue(languagesState)
  const skills = useRecoilValue(skillsState)
  const educationPeriods = useRecoilValue(educationState)
  const experiencePeriods = useRecoilValue(experienceState)

  let errors: string[] = []

  switch (currentStep) {
    case 0:
      errors = validateJobTitle(jobTitle)
      break
    case 1:
      errors = validateNameAndBio(fullName, bio)
      break
    case 2:
      errors = validateExperiencePeriods(experiencePeriods)
      break
    case 3:
      errors = validateEducationPeriods(educationPeriods)
      break
    case 4:
      errors = validateLanguages(languages)
      break
    case 5:
      errors = validateSkills(skills)
      break
    default:
      break
  }

  return errors
}

export const BackgroundQuestionnaire = () => {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(0)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const validationErrors = useValidation(currentStep)
  const [skipValidation, setSkipValidation] = useState(false)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Shift') {
        // hack for development
        setSkipValidation(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const steps: Step[] = [
    { component: <WantedJob />, name: 'Job Title' },
    { component: <Personal />, name: 'Personal' },
    { component: <Experience />, name: 'Experience' },
    { component: <Education />, name: 'Education' },
    { component: <Languages />, name: 'Languages' },
    { component: <Skills />, name: 'Skills' },
    { component: <SelectTemplate />, name: 'Template' },
  ]

  const generateCV = () => {
    navigate('/build-cv/generate')
  }

  const next = () => {
    // finished last step
    if (currentStep + 1 === steps.length) {
      generateCV()
    } else {
      if (!skipValidation) {
        if (validationErrors.length > 0) {
          const errorMessages = validationErrors.join(' ')
          toast.error(errorMessages, {
            duration: 7000,
          })
          return
        } else setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
      } else setCurrentStep(prev => Math.min(prev + 1, steps.length - 1))
    }
  }

  const back = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  return (
    <main className="flex-1 flex flex-col items-center pt-[50px]">
      <Stepper
        steps={steps}
        currentStepIndex={currentStep}
        onStepSelect={setCurrentStep}
      />
      <section
        className={`current-step flex-1 flex overflow-hidden ${
          currentStep === steps.length - 1 ? 'w-full' : 'w-[600px]'
        }`}
      >
        {steps[currentStep].component}
      </section>
      <section className="controls flex gap-[20px] pb-[50px] pt-[50px]">
        {currentStep !== 0 && (
          <Button text="Back" variant="secondary" onClick={back} />
        )}
        <Button text="Continue" onClick={next} />
      </section>
      {pdfUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-[80%] h-[80%]">
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="100%"
            />
            <button
              className="absolute top-2 right-2 text-gray-700"
              onClick={() => setPdfUrl(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
