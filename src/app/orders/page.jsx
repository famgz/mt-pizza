'use client';

import SectionHeaders from '@/components/layout/SectionHeaders';
import { useEffect, useState } from 'react';
import { UseProfile } from '@/components/UseProfile';
import UserTabs from '@/components/layout/UserTabs';
import Link from 'next/link';
import DeleteButton from '@/components/DeleteButton';
import Edit from '@/icons/Edit';
import InfoCircle from '@/icons/InfoCircle';
import { parseTime } from '@/libs/datetime';

export default function OrdersPage() {
  const { loading, data: profileData } = UseProfile();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders/').then((res) =>
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      })
    );
  }

  return (
    <div className='mt-8'>
      <UserTabs isAdmin={!!profileData?.admin} />
      <section className='page-content'>
        {/* Loading status */}
        {loadingOrders && (
          <div className='loading-status'>Loading orders...</div>
        )}
        <div className='mt-8'>
          {orders?.length > 0 &&
            orders.map((order, index) => (
              <div
                key={index}
                className='flex grow bg-gray-100 rounded-xl py-2 px-4 gap-1 mb-1 items-center'
              >
                <div className='grid grid-cols-3 md:grid-cols items-center grow gap-4 text-gray-400 text-xs'>
                  {/* Email */}
                  <div className='text-gray-500 font-bold'>
                    {order.userEmail}
                  </div>
                  {/* Products */}
                  <div className='text-gray-600 text-center'>
                    {/* {order.cartProducts.length + ' items'} */}
                    {order.cartProducts.map((p) => p.name).join(', ')}
                  </div>
                  <div className='flex items-center justify-center gap-4 text-white '>
                    {/* Paid status */}
                    <span
                      className={
                        (order.paid ? 'bg-green-500' : 'bg-red-400') +
                        ' py-1 px-2 rounded-md text-xs text-center w-[60px]'
                      }
                    >
                      {order.paid ? 'paid' : 'not paid'}
                    </span>
                    {/* Date */}
                    <span className='text-gray-400 text-right'>
                      {parseTime(order.createdAt)}
                    </span>
                  </div>
                </div>
                {/* Buttons */}
                <div className='flex gap-2'>
                  {/* Edit */}
                  <Link
                    href={'/orders/' + order._id}
                    className='button'
                    style={{ padding: 8 }}
                  >
                    <InfoCircle size={16} />
                  </Link>
                  {/* Delete */}
                  <DeleteButton
                    label=''
                    // onDelete={() => handleDeleteClick(user._id)}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
