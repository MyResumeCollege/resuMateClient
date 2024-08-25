import { ACCESS_TOKEN_KEY } from '@/services/authService'
import { userState } from '@/store/atoms/userAtom'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

export const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const user = useRecoilValue(userState)
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)

  if (!user || !token) return <Navigate to="/"></Navigate>

  return children
}
