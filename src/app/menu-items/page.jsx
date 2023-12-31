'use client';

import { useProfile } from '@/components/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import Right from '@/icons/Right';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MenuItemsPage(params) {
  const { loading, data } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((res) =>
      res.json().then((items) => {
        setMenuItems(items);
      })
    );
  }, []);

  if (loading) return 'Loading user info...';
  if (data.admin) return 'Not an admin';

  return (
    <section className='mt-8 max-w-md mx-auto'>
      <UserTabs isAdmin={true} />
      <div className='mt-8'>
        <Link className='button flex' href={'/menu-items/new'}>
          <span>Create new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        <h2 className='text-sm text-gray-500 mt-4 ml-2'>Edit menu item:</h2>
        <div className='grid grid-cols-3 gap-2'>
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={'/menu-items/edit/' + item._id}
                className='flex flex-col justify-between items-center bg-gray-200 rounded-lg p-4'
                key={item.name}
              >
                <div className='relative w-24'>
                  <Image
                    className='rounded-md w-full h-full'
                    src={item.image}
                    alt=''
                    width={200}
                    height={200}
                  />
                </div>
                <div className="text-center">
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
