'use client';

import UserTabs from '@/components/layout/UserTabs';
import { UseProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import DeleteButton from '@/components/DeleteButton';
import Edit from '@/icons/Edit'
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
                <div className='grid sm:grid-cols-4 gap-2 sm:gap-4 grow'>
                  <span className='text-gray-600 font-bold'>
                    {user.name || '<unnamed>'}
                  </span>
                  <span className='text-gray-400 sm:col-span-3'>{user.email}</span>
                </div>
                <div className='flex flex-col xs:flex-row gap-1'>
                  <Link className='button !px-2' href={'/users/' + user._id}>
                    <Edit size={18}/>
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
