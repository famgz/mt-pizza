'use client';

import {
  CartContext,
  cartProductTotalPrice,
  cartTotalPrice,
} from '@/components/AppContext';
import { UseProfile } from '@/components/UseProfile';
import SectionHeaders from '@/components/layout/SectionHeaders';
import UserAddressInputs from '@/components/layout/UserAddressInputs';
import Trash from '@/icons/Trash';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function CartPage() {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = UseProfile();

  const subTotal = cartTotalPrice(cartProducts);
  const deliveryFee = 5;
  const total = subTotal + deliveryFee;

  // populate user address inputs at loading
  useEffect(() => {
    const { phone, streetAddress, postalCode, city, country } = profileData;
    setAddress({ phone, streetAddress, postalCode, city, country });
  }, [profileData]);

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [propName]: value,
    }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // get address and shopping cart products
    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          // redirect to stripe
          const link = await response.json();
          window.location = link;
        } else {
          reject()
        }
      });
    });

    await toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Redirecting to payment',
      error: 'Something went wrong... Please try again later'
    })
  }

  return (
    <section className='mt-8'>
      <div className='text-center'>
        <SectionHeaders mainHeader='Cart' />
      </div>
      <div className='grid gap-10 grid-cols-2 mt-8'>
        {/* Left Panels (items) */}
        <div>
          {cartProducts?.length === 0 ? (
            // No products
            <div>No products in your shopping cart</div>
          ) : (
            // Products
            cartProducts.map((product, index) => (
              <div key={index} className='flex gap-4 mb-2 border-b py-2'>
                <div className='w-32'>
                  <Image
                    src={product.image}
                    alt={''}
                    width={240}
                    height={240}
                  />
                </div>
                <div className='grow'>
                  <h3 className='font-bold'>{product.name}</h3>
                  {product.size && (
                    <div className='text-sm'>
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className='text-sm text-gray-500'>
                      {product.extras.map((extra, index) => (
                        <div key={index}>
                          Extra {extra.name} + ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className='flex gap-4 items-center'>
                  <span className='text-lg font-semibold'>
                    ${cartProductTotalPrice(product)}
                  </span>
                  <button
                    onClick={() => removeCartProduct(index)}
                    className='p-2'
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          )}

          <div className='flex justify-end items-center py-2 pr-14'>
            <div className='text-gray-500 text-lg'>
              Subtotal: <br />
              Delivery: <br />
              Total:
            </div>
            <span className='text-lg font-semibold pl-2 text-right'>
              ${subTotal} <br />${deliveryFee} <br />${total} <br />
            </span>
          </div>

          {/* <div className='py-2 text-right pr-14'>
            <span className='text-gray-500'>Delivery fee:</span>
            <span className='text-lg font-semibold pl-2'>${deliveryFee}</span>
          </div> */}
        </div>

        {/* Right panel (Checkout form) */}
        <div>
          <div className='bg-gray-200 p-4 rounded-lg'>
            <h2 className='font-bold'>Checkout</h2>
            <form onSubmit={proceedToCheckout} className='mt-2'>
              <div className='grow'>
                <UserAddressInputs
                  addressPops={address}
                  setAddressProp={handleAddressChange}
                />
              </div>
              <button className='mt-6' type='submit'>
                Pay ${subTotal + deliveryFee}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
