'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;
  const user = session?.data?.user;
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  console.log(session);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    toast.dismiss();

    const savingPromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, image }),
    }).then((response) => {
      if (response.ok) return true;
      throw new Error('Something went wrong');
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error saving the profile',
    });
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((imageLink) => {
            console.log(imageLink);
            setImage(imageLink);
          });
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(
        uploadingPromise,
        {
          loading: 'Uploading...',
          success: 'Upload done!\nClick Save to complete',
          error: 'upload error',
        },
        {
          success: {
            duration: 5000,
          },
        }
      );
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
        {/* {isSaving && <InfoBox loading={true}>Saving...</InfoBox>}
        {saved && <InfoBox loading={false}>Profile saved!</InfoBox>}
        {isUploading && <InfoBox loading={true}>Uploading...</InfoBox>}
        {uploaded && !saved && ( <InfoBox loading={false}> Image Uploaded! Hit the Save button to complete. </InfoBox> )} */}
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
