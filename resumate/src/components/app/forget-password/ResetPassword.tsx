import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { Button } from '@/components/shared/button/Button';
import apiClient from '@/services/httpCommon';
import toast from 'react-hot-toast';
import Resume from '@/assets/icons/resume.svg';

export const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await apiClient.get(`/auth/reset-password/${token}`);
        setIsValidToken(true);
      } catch (error) {
        toast.error('Invalid or expired reset token');
        navigate('/forgot-password');
      }
    };

    verifyToken();
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post(`/auth/reset-password/${token}`, { password });
      toast.success('Password reset successful');
      navigate('/');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    const syntheticEvent = new Event('submit', {
      bubbles: true,
      cancelable: true,
    }) as unknown as React.FormEvent;
    handleSubmit(syntheticEvent);
  };

  if (!isValidToken) {
    return <div>Verifying token...</div>;
  }

  return (
    <main className='flex-1 flex flex-col items-center justify-center'>
      <section className='flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg'>
        <div className='bg-primary rounded-md flex-1 px-8 flex items-center'>
          <img src={Resume} className='w-[250px]' alt='Resume' />
        </div>
        <section className='flex flex-col gap-2 w-[400px]'>
          <h1 className='text-4xl font-bold mb-[20px]'>Reset Password</h1>
            <TextInput
              label='New Password'
              value={password}
              onChange={setPassword}
              type='password'
            />
            <TextInput
              label='Confirm New Password'
              value={confirmPassword}
              onChange={setConfirmPassword}
              type='password'
            />
            <Button
              onClick={handleButtonClick}
              disabled={isLoading}
              buttonClassName='w-full mt-4'
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          <div className='text-center py-1'>
            <span className='text-sm'>
              Remember your password?{' '}
              <Link to='/' className='text-primary font-medium'>
                Log In
              </Link>
            </span>
          </div>
        </section>
      </section>
    </main>
  );
};
