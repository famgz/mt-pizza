'use client';

import { UseProfile } from '@/components/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import Right from '@/icons/Right';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MenuItemsPage() {
  const { loading, data } = UseProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((res) =>
      res.json().then((items) => {
        setMenuItems(items);
      })
    );
  }, []);

  if (loading)
    return <div className='loading-status'>Loading menu items...</div>;
  if (!data.admin) return <div className='loading-status'>Not an admin</div>;

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={!!data?.admin} />
      <section className='page-content'>
        <div className='mt-8'>
          <Link className='button flex' href={'/menu-items/new'}>
            <span>Create new menu item</span>
            <Right />
          </Link>
        </div>
        <div>
          <h2 className='text-sm text-gray-500 mt-4 ml-2'>Edit menu item:</h2>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {menuItems?.length > 0 &&
              menuItems.map((item) => (
                <Link
                  href={'/menu-items/edit/' + item._id}
                  className='card flex flex-col justify-between items-center bg-gray-200 rounded-lg p-4'
                  key={item.name}
                >
                  <div className='relative'>
                    <Image
                      className='rounded-md w-full h-full'
                      src={item.image || '/default-image.jpg'}
                      alt=''
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className='text-center'>{item.name}</div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
