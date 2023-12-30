'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;
  const user = session?.data?.user;
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  console.log(session);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, image }),
    });

    setIsSaving(false);

    if (response.ok) {
      setSaved(true);
    }
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      setIsUploading(true);
      const data = new FormData();
      data.set('file', files[0]);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      const imageLink = await response.json();
      console.log({ imageLink });
      setIsUploading(false);
      if (imageLink) {
        setImage(imageLink);
        setUploaded(true);
      }
    }
  }

  if (status === 'loading') {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4'>Profile</h1>
      <div className='max-w-md mx-auto'>
        {isSaving && (
          <h2 className='text-center bg-blue-100 p-4 rounded-lg border border-blue-300'>
            Saving...
          </h2>
        )}
        {saved && (
          <h2 className='text-center bg-green-100 p-4 rounded-lg border border-green-300'>
            Profile saved!
          </h2>
        )}
        {isUploading && (
          <h2 className='text-center bg-blue-100 p-4 rounded-lg border border-blue-300'>
            Uploading...
          </h2>
        )}
        {(uploaded && !saved) && (
          <h2 className='text-center bg-green-100 p-4 rounded-lg border border-green-300'>
            Image Uploaded! Hit the Save button to complete.
          </h2>
        )}
      </div>

      <div className='max-w-md mx-auto'>
        <div className='flex gap-4 items-center'>
          <div>
            <div className='p-2 rounded-lg relative max-w-[120px]'>
              {image && (
                <Image
                  className='rounded-lg w-full h-full mb-1'
                  src={image}
                  width={250}
                  height={250}
                  alt='avatar'
                />
              )}
              <label>
                <input
                  type='file'
                  className='hidden'
                  onChange={handleFileChange}
                />
                <span className='block border border-gray-300 text-center rounded-lg p-2 cursor-pointer'>
                  Edit
                </span>
              </label>
            </div>
          </div>
          <form className='grow' onSubmit={handleProfileInfoUpdate}>
            <input
              type='text'
              placeholder='First and last name'
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <input type='email' disabled value={user.email} />
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
