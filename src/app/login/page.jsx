'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);

  // Login with Google
  async function logInGoogle() {
    setLoginInProgress(true);
    const res = await signIn('google', { callbackUrl: '/', redirect: true });
    if (res?.status === 200) {
      console.log('google login ok');
    } else {
      console.log('Google Login Error:', res?.error);
    }
    setLoginInProgress(false);
  }

  // Login with user form credentials
  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);

    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
      redirect: true,
    });
    if (res?.status === 200) {
      console.log('login ok');
    } else {
      console.log('Login Error:', res?.error);
    }

    setLoginInProgress(false);
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Login</h1>

      <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type='submit' disabled={loginInProgress}>
          Login
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button
          type='button'
          // onClick={() => signIn('google')}
          onClick={logInGoogle}
          className='flex gap-4 justify-center'
        >
          <Image src={'/google.png'} alt='' height={24} width={24} />
          Login with Google
        </button>
        <div className='text-center my-4 text-gray-500 border-t py-4'>
          Don&lsquo;t have an account?{' '}
          <Link className='underline text-gray-700' href={'/register'}>
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
