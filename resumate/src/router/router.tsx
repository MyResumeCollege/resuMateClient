import { Dashboard } from '@/components/app/dashboard/Dashboard'
import { ForgotPassword } from '@/components/app/forget-password/ForgotPassword'
import { ResetPassword } from '@/components/app/forget-password/ResetPassword'
import { BackgroundQuestionnaire } from '@/components/app/generating-proccess/background-questionnaire/BackgroundQuestionnaire'
import { Generate } from '@/components/app/generating-proccess/generate/Generate'
import { Start } from '@/components/app/generating-proccess/start/Start'
import Preview from '@/components/app/generating-proccess/view-cv/Preview'
import ViewCV from '@/components/app/generating-proccess/view-cv/ViewCV'
import { Login } from '@/components/app/login/Login'
import Payment from '@/components/app/payment/payment'
import { PremiumPlan } from '@/components/app/premium/PremiumPlan'
import { Register } from '@/components/app/register/Register'
import { createBrowserRouter } from 'react-router-dom'
import { NavbarWrapper } from './NavBarWrapper'
import { NotFoundPage } from './NotFoundPage'
import { ProtectedRoute } from './ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
  },
  {
    path: '/reset-password/:token',
    element: <ResetPassword />,
  },
  {
    path: '/preview/:id/clear',
    element: (
      <ProtectedRoute>
        <Preview />
     </ProtectedRoute>
    ),
  },
  {
    path: '/preview/:id/download',
    element: (
        <Preview readonly />
    ),
  },
  // Have NavBar on top
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <NavbarWrapper />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/build-cv',
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute>
                <Start />{' '}
              </ProtectedRoute>
            ),
          },
          {
            path: 'background',
            element: (
              <ProtectedRoute>
                <BackgroundQuestionnaire />
              </ProtectedRoute>
            ),
          },
          {
            path: 'generate',
            element: (
              <ProtectedRoute>
                <Generate />
              </ProtectedRoute>
            ),
          },
          {
            path: 'view',
            element: (
              <ProtectedRoute>
                <ViewCV />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '/pricing',
        element: (
          <ProtectedRoute>
            <PremiumPlan />
          </ProtectedRoute>
        ), // Add protected Route
      },
      {
        path: '/payment',
        element: (
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        ), // Add protected Route
      },
      {
        path: '/preview/:id',
        element: (
          <ProtectedRoute>
            <Preview />
          </ProtectedRoute>
        ), // Add protected Route
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
