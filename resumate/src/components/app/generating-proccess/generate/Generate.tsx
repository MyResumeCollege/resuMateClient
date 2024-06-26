import Lottie from 'react-lottie'
import AiLoadingAnimation from '@/assets/lotties/ai-loading.json'
import { useRecoilValue } from 'recoil'
import {
  summaryState,
  educationState,
  fullNameState,
  jobTitleState,
} from '../store/state'
import { useEffect } from 'react'
import { uploadResume } from '../../../../services/uploadResume'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import apiClient from '@/services/httpCommon'

export const Generate = () => {
  const location = useLocation()
  const { existCV } = location.state || {}

  const fullName = useRecoilValue(fullNameState)
  const bio = useRecoilValue(summaryState)
  const education = useRecoilValue(educationState)
  const jobTitle = useRecoilValue(jobTitleState)

  const generateCV = async () => {
    if (existCV) {
      try {
        if (existCV instanceof File) {
          const improvedResume = await uploadResume(existCV)

          // TODO - convert text to pdf and download pdf
          // Amit comment: download logic shouldn't be here, but on the CV view page
          console.log(improvedResume.data.CVTextContent)
        }
      } catch (error) {
        toast.error('Failed to upload the file. Please try again.')
      }
    } else {
      const res = await apiClient.post('/cv/generate-resume', {
        name: fullName,
        job: jobTitle,
        education: education,
        description: bio,
        goals: '',
      })
      console.log(res.data.CVTextContent)
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
