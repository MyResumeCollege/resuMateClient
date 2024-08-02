import { AxiosResponse } from 'axios'
import apiClient from './httpCommon'
import { User } from '../types/user'

type UserPremium = {
  id: string
  isPremium: string
}
export const setUserPremiumStatus = async (
  isPremium: boolean,
  userId?: User['_id']
): Promise<AxiosResponse<UserPremium>> => {
  if (!userId) {
    throw new Error('User ID is required')
  }
  return await apiClient.post(`user/${userId}/set-premium`, { isPremium })
}

export const checkUserPremiumStatus = async (
  userId: string
): Promise<AxiosResponse<{ isPremium: boolean }>> => {
  return await apiClient.get(`/user/${userId}/is-premium`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
}
