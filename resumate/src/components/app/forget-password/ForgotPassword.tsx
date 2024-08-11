import React, { useState } from 'react';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { Button } from '@/components/shared/button/Button';
import apiClient from '@/services/httpCommon';
import toast from 'react-hot-toast';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setIsLoading(true);

    try {
      await apiClient.post('/auth/forgot-password', { email });
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (error) {
      toast.error('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <TextInput
            label='Email Address'
            value={email}
            onChange={setEmail}
            type='email'
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !email || !isValidEmail(email)}
            buttonClassName='w-full mt-4'
          >
            {isLoading ? 'Sending...' : 'Send Reset Email'}
          </Button>
        </form>
      </div>
    </div>
  );
};
