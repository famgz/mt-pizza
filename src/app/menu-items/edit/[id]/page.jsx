'use client';

import EditableImage from '@/components/layout/EditableImage';
import UserTabs from '@/components/layout/UserTabs';
import MenuItemForm from '@/components/layout/MenuItemForm';
import { UseProfile } from '@/components/UseProfile';
import Left from '@/icons/Left';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import DeleteButton from '@/components/DeleteButton';

export default function EditMenuItemPage() {
  const { id } = useParams();
  const { loading, data } = UseProfile();

  const [menuItem, setMenuItem] = useState(null);

  const [redirectToItems, setRedirectToItems] = useState(false);

  useEffect(() => {
    fetch('/api/menu-items').then((res) =>
      res.json().then((items) => {
        const item = items.find((i) => i._id === id);
        setMenuItem(item);
      })
    );
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'PUT',
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

  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items?_id=' + id, {
        method: 'DELETE',
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Erroe',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) return redirect('/menu-items');

  if (loading) return 'Loading user info...';
  if (!data.admin) return 'Not an admin';

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={data.admin} />
      <section className='page-content'>
        <div>
          <Link href={'/menu-items'} className='button'>
            <Left />
            <span>Show all menu items</span>
          </Link>
        </div>
        <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit} />
        <div className='sm:grid sm:w-[70%] sm:pl-3 items-center ml-auto mt-2 '>
          <DeleteButton
            label='Delete this menu item'
            onDelete={handleDeleteClick}
          />
        </div>
      </section>
    </div>
  );
}
