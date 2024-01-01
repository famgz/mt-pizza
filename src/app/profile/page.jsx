'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserTabs from '@/components/layout/UserTabs';
import EditableImage from '@/components/layout/EditableImage';


export default function ProfilePage() {
  const session = useSession();
  const status = session.status;

  const user = session?.data?.user;
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false)

  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('api/profile').then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true)
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    toast.dismiss();

    const savingPromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: userName,
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

  if (status === 'loading' || !profileFetched) {
    return 'Loading...';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={isAdmin} />
      <section className='page-content'>
        <div className='flex gap-4'>
          <div>
            <div className='flex flex-col p-2 rounded-lg relative max-w-[200px]'>
              <EditableImage link={image || '/default-profile.jpg'} setLink={setImage}/>
            </div>
          </div>
          <form className='grow' onSubmit={handleProfileInfoUpdate}>
            <label>First and last name</label>
            <input
              type='text'
              placeholder='First and last name'
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            />
            <label>Email</label>
            <input
              type='email'
              disabled
              value={user.email}
              placeholder='Email'
            />
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
              <div>
                <label>City</label>
                <input
                  style={{ marginTop: 0 }}
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                  type='text'
                  placeholder='City'
                />
              </div>
              <div>
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
            </div>
            <label>Country</label>
            <input
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
              type='text'
              placeholder='Country'
            />
            <button type='submit'>Save</button>
          </form>
        </div>
      </section>
    </div>
  );
}
