import { AxiosResponse } from 'axios'
import apiClient from './httpCommon'

export const translateCV = async (
  file: File, // Assuming this is a PDF file
  language: string
): Promise<AxiosResponse<string>> => {
  // Check if the file is a PDF by examining its type
  if (file.type !== 'application/pdf') {
    throw new Error('File must be a PDF.')
  }

  const formData = new FormData()
  // Append the file under the key 'file'
  // Ensure the key matches the backend expectation
  formData.append('file', file) // Corrected key to 'file'

  return await apiClient.post(`/cv/translate-resume`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      resumeLanguage: language, // Custom header for language
    },
  })
}
