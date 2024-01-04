'use client';

import { CartContext, cartTotalPrice } from '@/components/AppContext';
import SectionHeaders from '@/components/layout/SectionHeaders';
import UserAddressInput from '@/components/layout/UserAddressInputs';
import CartProduct from '@/components/menu/CartProduct';
import CartPrices from '@/components/menu/CartPrices';
import CircleCheck from '@/icons/CircleCheck';
import ErrorTriangle from '@/icons/ErrorTriangle';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

export default function OrderPage(params) {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();

  const subTotal = cartTotalPrice(order?.cartProducts) || 0;
  const deliveryFee = 5;
  const total = subTotal + deliveryFee;

  useEffect(() => {
    if (typeof window.console !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      try {
        fetch('/api/orders?_id=' + id)
          .then((res) => {
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
            return res.json();
          })
          .then((orderData) => {
            if (orderData) {
              setOrder(orderData);
            } else {
              console.log('Empty response from server');
            }
          })
          .catch((error) => {
            console.log('Error getting the order data', error);
          });
      } catch (error) {
        console.log('Error getting the order data', error);
      }
    }
  }, []);

  return (
    <div className='mt-8'>
      <section className='page-content'>
        <div className='text-center'>
          <SectionHeaders mainHeader='Your Order' />
          {/* Invalid order id */}
          {!order && (
            <div className='flex flex-col my-4 mt-8 gap-4 justify-center items-center'>
              <div className='mt-4 text-gray-300'>
                <ErrorTriangle size={160} />
              </div>
              <p>Invalid order parameter</p>
            </div>
          )}

          {order && order?.paid && (
            // Paid order
            <div className='my-4 flex flex-col gap-6 justify-center items-center'>
              <div className='mt-4 text-emerald-400'>
                <CircleCheck size={160} />
              </div>
              <p>Thanks for your order!</p>
              <p>We will contact you when your products will be on the way</p>
            </div>
          )}
          {order && !order?.paid && (
            // Unpaid/unfinished order
            <div className='flex flex-col my-4 mt-8 gap-4 justify-center items-center'>
              <p>This order was cancelled or not paid yet</p>
              <p>Go to the Checkout page or create another order</p>
            </div>
          )}
        </div>
        {order && (
          <div className='grid grid-cols-2 gap-16 mt-12'>
            {/* Left panel - Order details */}
            <div>
              {order.cartProducts.map((product, index) => (
                <CartProduct key={index} product={product} index={index} />
              ))}
              <CartPrices
                subTotal={subTotal}
                deliveryFee={deliveryFee}
                total={total}
              />
            </div>
            {/* Right panel - Address info */}
            <div>
              <div className='bg-gray-200 p-4 rounded-lg'>
                <UserAddressInput disabled={true} addressPops={order} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
