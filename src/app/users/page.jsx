'use client';

import UserTabs from '@/components/layout/UserTabs';
import { UseProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import DeleteButton from '@/components/DeleteButton';
import Link from 'next/link';

export default function UsersPage() {
  const { loading, data } = UseProfile();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users').then((res) => {
      res.json().then((users) => setUsers(users));
    });
  }, []);

  if (loading)
    return <div className='loading-status'>Loading user info...</div>;
  if (!data.admin) return <div className='loading-status'>Not an admin</div>;

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={true} />
      <section className='page-content'>
        <div className='mt-8 w-full'>
          {users?.length > 0 &&
            users.map((user) => (
              <div
                key={user._id}
                className='flex grow bg-gray-100 rounded-xl py-2 px-4 gap-1 mb-1 items-center'
              >
                <div className='grid grid-cols-2 md:grid-cols-3 grow gap-4'>
                  <span className='text-gray-600 font-bold'>
                    {user.name || '<unnamed>'}
                  </span>
                  <span className='text-gray-400'>{user.email}</span>
                </div>
                <div className='flex gap-1'>
                  <Link className='button' href={'/users/' + user._id}>
                    Edit
                  </Link>
                  <DeleteButton
                    label=''
                    onDelete={() => handleDeleteClick(user._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
