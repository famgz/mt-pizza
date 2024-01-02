'use client';

import { UseProfile } from '@/components/UseProfile';
import UserForm from '@/components/layout/UserForm';
import UserTabs from '@/components/layout/UserTabs';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditUserPage() {
  const { loading, data } = UseProfile();
  const [user, setUser] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  if (loading) return 'Loading user info...';
  if (!data.admin) return 'Not an admin';

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={true} />
      <section className='page-content'>
        <UserForm user={user} />
      </section>
    </div>
  );
}
