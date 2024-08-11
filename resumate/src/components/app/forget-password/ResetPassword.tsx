import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { Button } from '@/components/shared/button/Button';
import apiClient from '@/services/httpCommon';
import toast from 'react-hot-toast';

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
    // Create a synthetic event
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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Reset Password</h2>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </div>
  );
};
