'use client';

import MenuItemForm from '@/components/layout/MenuItemForm';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Left from '@/icons/Left';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewMenuItemPage() {
  const { loading, data } = useProfile();

  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving this tasty item',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) return redirect('/menu-items');

  if (loading) return 'Loading user info...';
  if (data.admin) return 'Not an admin';

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <div className='max-w-md mx-auto mt-8'>
        <Link href={'/menu-items'} className='button'>
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
  );
}
