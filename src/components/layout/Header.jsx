'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../AppContext';
import ShoppingCart from '@/icons/ShoppingCart';

export default function Header(params) {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  const [userName, setUsername] = useState(userData?.name);
  const { cartProducts } = useContext(CartContext);

  useEffect(() => {
    if (!userName) {
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          let name = data?.name;
          if (name && name.includes(' ')) {
            name = name.split(' ')[0];
          }
          setUsername(data?.name || data.email);
        });
      });
    }
  }, []);

  useEffect(() => {
    console.log({ session });
  }, [status]);

  return (
    <header className='flex items-center justify-between'>
      <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
        <Link className='text-primary font-extrabold text-2xl' href='/'>
          ST PIZZA
        </Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>
      <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
        {status === 'authenticated' && (
          <>
            <Link href={'/profile'} className='whitespace-nowrap'>
              {userName ? 'Hello, ' + userName : 'Profile'}
            </Link>
            <button
              onClick={() => signOut()}
              className='bg-primary rounded-full text-white px-8 py-2'
            >
              Logout
            </button>
          </>
        )}
        {status === 'unauthenticated' && (
          <>
            <Link href={'/login'}>Login</Link>
            <Link
              href={'/register'}
              className='bg-primary rounded-full text-white px-8 py-2'
            >
              Register
            </Link>
          </>
        )}
        <Link className='flex relative' href={'/cart'}>
          <ShoppingCart size={30} />
          {cartProducts?.length > 0 && (
            <span className='absolute -top-2 -right-3 pt-[3px] font-extrabold bg-primary text-white text-xs h-[21px] w-[21px] items-center text-center rounded-full '>
              {cartProducts.length}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
