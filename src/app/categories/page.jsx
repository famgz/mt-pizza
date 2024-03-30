'use client';

import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import { UseProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';
import DeleteButton from '@/components/DeleteButton';

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const { loading, data } = UseProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  function fetchCategories() {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      if (editedCategory) {
        data._id = editedCategory._id;
      }
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      fetchCategories();
      setCategoryName('');
      setEditedCategory(null);
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editedCategory ? 'Category updated' : 'Category created',
      error: 'Error, sorry',
    });
  }

  async function handleDeleteClick(_id) {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    fetchCategories();
  }

  if (loading)
    return <div className='loading-status'>Loading categories...</div>;
  if (!data.admin) return <div className='loading-status'>Not an admin</div>;

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={true} />
      <section className='page-content'>
        <form className='mt-8' onSubmit={handleCategorySubmit}>
          <div className='flex flex-col gap-0 2xs:flex-row 2xs:items-end 2xs:gap-2'>
            {/* Edit field */}
            <div className='grow'>
              <label>
                {editedCategory ? 'Update category' : 'New category name'}
                {editedCategory && (
                  <>
                    : <b>{editedCategory.name}</b>
                  </>
                )}
              </label>
              <input
                type='text'
                className=''
                value={categoryName}
                onChange={(ev) => setCategoryName(ev.target.value)}
              />
            </div>
            {/* Edit buttons */}
            <div className='pb-3 flex gap-2'>
              <button className='border border-primary px-4' type='submit'>
                {editedCategory ? 'Update' : 'Create'}
              </button>
              <button
                className='px-4'
                type='button'
                onClick={() => {
                  setCategoryName('');
                  setEditedCategory(null);
                }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
        {/* Categories list */}
        <div>
          <h2 className='ml-2 mt-8 text-sm text-gray-500'>Categories:</h2>
          {categories?.length > 0 &&
            categories.map((c) => (
              <div
                key={c._id}
                className='bg-gray-100 rounded-xl py-2 px-4 flex gap-1 mb-1 items-center'>
                <div className='grow'>{c.name}</div>
                <div className='flex gap-1'>
                  <button
                    onClick={() => {
                      setEditedCategory(c);
                      setCategoryName(c.name);
                    }}
                    type='button'>
                    Edit
                  </button>
                  <DeleteButton
                    label=''
                    onDelete={() => handleDeleteClick(c._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
