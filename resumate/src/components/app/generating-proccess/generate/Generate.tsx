import AiLoadingAnimation from '@/assets/lotties/ai-loading.json'
import { generateCVFromScratch } from '@/services/GenerateResume'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import Lottie from 'react-lottie'
import { useLocation, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { uploadResume } from '../../../../services/uploadResume'
import { educationState, experienceState, summaryState } from '../store/state'

export const Generate = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { existCV } = location.state || {}

  const bio = useRecoilValue(summaryState)
  const experiences = useRecoilValue(experienceState)
  const educations = useRecoilValue(educationState)

  const generateCV = async () => {
    let resumeText;

    if (existCV) {
      try {
        if (existCV instanceof File) {
          const improvedResume = await uploadResume(existCV)
          resumeText = improvedResume.data

          if (resumeText) navigate('/build-cv/view', { state: { resumeText } })
        }
      } catch (error) {
        toast.error('Failed to upload the file. Please try again.')
      }
    } else {
      try {
        const generateResume = await generateCVFromScratch({
          bio,
          experiences: Array.isArray(experiences) ? experiences : [],
          educations: Array.isArray(educations) ? educations : [],
        })
        resumeText = generateResume.data

        if (resumeText) navigate('/build-cv/view', { state: { resumeText } })
      } catch (error) {
        toast.error('Failed to generate resume from scratch. Please try again.')
      }
    }
  }

  useEffect(() => {
    generateCV()
  }, [])

  return (
    <main className="flex-1 flex flex-col items-center justify-center">
      <Lottie
        isClickToPauseDisabled
        options={{ animationData: AiLoadingAnimation, loop: true }}
        style={{
          height: 200,
          width: 200,
          filter: 'drop-shadow(4px 4px 8px #bababa)',
          marginBottom: 20,
        }}
      />
      <h2 className="font-semibold text-xl mb-[3px]">
        Our AI engine is generating your CV
      </h2>
      <span className="opacity-60">
        did you know? 80% don't put images on their CVs
      </span>
    </main>
  )
}
