import { Button } from '@/components/shared/button/Button';
import { TextInput } from '@/components/shared/inputs/text-input/TextInput';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Resume from '@/assets/icons/resume.svg';
import { useRecoilState } from 'recoil';
import { userState } from '../../../store/atoms/userAtom';
import {
  saveTokens,
  googleSignIn,
  loginUser,
} from '../../../services/authService';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate('/build-cv');
  //   }
  // }, [user]);
  const onGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const response = await googleSignIn(credentialResponse);
      const { data: loginGoogleRes } = response;

      saveTokens({
        accessToken: loginGoogleRes.accessToken,
        refreshToken: loginGoogleRes.refreshToken,
      });
      setUser(loginGoogleRes.user);
      navigate('/pricing');
    } catch (err) {
      console.log(err);
    }
  };

  const onGoogleLoginFailure = () => {
    console.log('failed google log in');
  };

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      const { data: loginRes } = response;

      saveTokens({
        accessToken: loginRes.accessToken,
        refreshToken: loginRes.refreshToken,
      });
      setUser(loginRes.user);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='flex-1 flex flex-col items-center justify-center'>
      <section className='flex gap-10 bg-white p-10 rounded-lg w-fit shadow-lg'>
        <div className='bg-primary rounded-md flex-1 px-8 flex items-center'>
          <img src={Resume} className='w-[250px]' />
        </div>
        <section className='flex flex-col gap-2 w-[400px]'>
          <h1 className='text-4xl font-bold mb-[20px]'>Login</h1>
          <TextInput value={email} onChange={setEmail} label='Email Address' />
          <TextInput
            value={password}
            onChange={setPassword}
            type='password'
            label='Password'
          />
          <div className='flex pt-2 text-sm items-center'>
            <div className='flex items-center gap-2'>
              <input type='checkbox' />
              <span>Remember me</span>
            </div>
            <Link to={'/forgot-password'} className='ml-auto text-primary'>
              Forgot Password?
            </Link>
          </div>
          <Button onClick={handleLogin}>Log In</Button>
          <div className='text-center py-1'>
            <span className='text-sm'>
              Don't have an account?{' '}
              <Link to='/register' className='text-primary font-medium'>
                Sign Up
              </Link>
            </span>
          </div>
          <div className='text-center py-6 flex items-center '>
            <span className='h-[1px] bg-[black] flex-1 opacity-20'></span>
            <span className='text-xs px-3 opacity-80'>Or login with</span>
            <span className='h-[1px] bg-[black] flex-1 opacity-20'></span>
          </div>
          <GoogleLogin
            width={400}
            logo_alignment='center'
            text='signin'
            onSuccess={onGoogleLoginSuccess}
            onError={onGoogleLoginFailure}
          />
        </section>
      </section>
    </main>
  );
};
