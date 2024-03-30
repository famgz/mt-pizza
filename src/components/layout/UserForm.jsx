'use client';

import EditableImage from '@/components/layout/EditableImage';
import UserAddressInputs from '@/components/layout/UserAddressInputs';
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

  const isUserLoggedIn = loggedInUserData.email === user.email;

  useEffect(() => {}, []);

  function handleAddressChange(propName, value) {
    switch (propName) {
      case 'phone':
        setPhone(value);
        break;
      case 'streetAddress':
        setStreetAddress(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      default:
        return;
    }
  }

  async function handleSaveButtonClick(ev) {
    ev.preventDefault();

    toast.dismiss();

    const savingPromise = fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // _id,
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
      if (response.ok) {
        return true;
      } else {
        throw new Error('Something went wrong');
      }
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error saving the profile',
    });
  }

  return (
    <div className='flex flex-col md:flex-row gap-4'>
      {/* Profile Image */}
      <div>
        <div className='flex flex-col p-2 rounded-lg relative max-w-[200px] mx-auto'>
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      {/* Profile form */}
      <form className='grow' onSubmit={handleSaveButtonClick}>
        <label>First and last name</label>
        <input
          type='text'
          placeholder='First and last name'
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type='email'
          disabled
          defaultValue={user.email}
          placeholder='Email'
        />

        <UserAddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        <div>
          <label
            className='inline-flex items-center gap-2 ml-0 p-2 mb-2'
            htmlFor='adminCheckBox'>
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
              <span className='ml-1'>
                (You cannot change your own admin status)
              </span>
            )}
          </label>
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}
