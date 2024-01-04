'use client';

import UserForm from '@/components/layout/UserForm';
import UserTabs from '@/components/layout/UserTabs';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;

  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('api/profile').then((response) => {
        response.json().then((data) => {
          setUser(data);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  if (status === 'loading' || !profileFetched) {
    return <div className='loading-status'>Loading user profile...</div>;
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={isAdmin} />
      <section className='page-content'>
        <UserForm user={user} />
      </section>
    </div>
  );
}
