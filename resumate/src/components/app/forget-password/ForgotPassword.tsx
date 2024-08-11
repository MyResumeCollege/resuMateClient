import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { Button } from '@/components/shared/button/Button';
import apiClient from '@/services/httpCommon';
import toast from 'react-hot-toast';
import Resume from '@/assets/icons/resume.svg';

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
    <main className='flex-1 flex flex-col items-center justify-center'>
      <section className='flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg'>
        <div className='bg-primary rounded-md flex-1 px-8 flex items-center'>
          <img src={Resume} className='w-[250px]' alt='Resume' />
        </div>
        <section className='flex flex-col gap-2 w-[400px]'>
          <h1 className='text-4xl font-bold mb-[20px]'>Forgot Password</h1>
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
