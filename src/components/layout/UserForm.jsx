'use client';

import EditableImage from '@/components/layout/EditableImage';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UseProfile } from '../UseProfile';

export default function UserForm({ user }) {
  const _id = user._id;
  const { data: loggedInUserData } = UseProfile(); // ?

  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);

  const isUserLoggedIn = loggedInUserData.email === user.email

  useEffect(()=>{

  },[])

  async function handleSaveButtonClick(ev) {
    ev.preventDefault();

    toast.dismiss();

    const savingPromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _id,
        name,
        // email: user.email,
        admin,
        image,
        phone,
        streetAddress,
        postalCode,
        city,
        country,
      }),
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

  return (
    <div className='flex gap-4'>
      <div>
        <div className='flex flex-col p-2 rounded-lg relative max-w-[200px]'>
          <EditableImage
            link={image}
            setLink={setImage}
          />
        </div>
      </div>
      <form
        className='grow'
        onSubmit={handleSaveButtonClick}
      >
        <label>First and last name</label>
        <input
          type='text'
          placeholder='First and last name'
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Email</label>
        <input type='email' disabled value={user.email} placeholder='Email' />
        <label>Phone number</label>
        <input
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
          type='tel'
          placeholder='Phone number'
        />
        <label>Street address</label>
        <input
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
          type='text'
          placeholder='Street address'
        />
        <div className='flex gap-2'>
          <div className='grow'>
            <label>Postal code</label>
            <input
              style={{ marginTop: 0 }}
              className='my-0'
              value={postalCode}
              onChange={(ev) => setPostalCode(ev.target.value)}
              type='text'
              placeholder='Postal code'
            />
          </div>
          <div className='grow'>
            <label>City</label>
            <input
              style={{ marginTop: 0 }}
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
              type='text'
              placeholder='City'
            />
          </div>
        </div>
        <label>Country</label>
        <input
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
          type='text'
          placeholder='Country'
        />
        <div>
          <label
            className='inline-flex items-center gap-2 ml-0 p-2 mb-2'
            htmlFor='adminCheckBox'
          >
            <input
              id='adminCheckBox'
              type='checkbox'
              className=''
              value={'1'}
              checked={admin}
              disabled={isUserLoggedIn}
              onChange={(ev) => setAdmin(ev.target.checked)}
            />
            <span className='text-sm'>Admin</span>
            {isUserLoggedIn && (
              <span className='ml-1'>(You cannot change your own admin status)</span>
            )}
          </label>
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
