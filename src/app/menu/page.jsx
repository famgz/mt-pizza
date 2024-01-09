'use client';

import { useEffect, useState } from 'react';
import SectionHeaders from '@/components/layout/SectionHeaders';
import { UseProfile } from '@/components/UseProfile';
import MenuItem from '@/components/menu/MenuItem';

export default function MenuPage() {
  const { loading, data } = UseProfile();
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => setCategories(categories));
    });

    fetch('api/menu-items').then((res) =>
      res.json().then((menuItems) => setMenuItems(menuItems))
    );
  }, []);

  if (loading)
    return <div className='loading-status'>Loading menu items...</div>;

  return (
    <section className='mt-8'>
      <div className='page-content'>
      {categories?.length > 0 &&
        categories.map((c, index) => (
          <div key={index}>
            <div className='text-center'>
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className='grid sm:grid-cols-3 gap-4 my-8'>
              {menuItems?.length > 0 &&
                menuItems.map((item, index) => {
                  if (item.category !== c._id) return;
                  return <MenuItem key={index} {...item} />;
                })}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
