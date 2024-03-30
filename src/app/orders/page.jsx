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
                className='grid sm:flex grow bg-gray-100 rounded-xl py-2 px-4 gap-2 mb-2 items-center'>
                <div className='grid sm:grid-cols-3 items-center grow gap-4 text-gray-400 text-xs'>
                  {/* Email */}
                  <div className='text-gray-500 font-bold'>
                    {order.userEmail || '<no email>'}
                  </div>
                  {/* Products */}
                  <div className='text-gray-600 sm:text-center max-w-[400px]'>
                    {/* {order.cartProducts.length + ' items'} */}
                    {order.cartProducts.map((p) => p.name).join(', ')}
                  </div>
                  <div className='flex items-center justify-between sm:justify-center gap-2 text-white '>
                    <div className='flex gap-2 items-center'>
                      {/* Paid status */}
                      <span
                        className={
                          (order.paid ? 'bg-green-500' : 'bg-red-400') +
                          ' py-1 px-2 rounded-md text-xs text-center !w-[70px] whitespace-nowrap'
                        }>
                        {order.paid ? 'paid' : 'not paid'}
                      </span>
                      {/* Date */}
                      <span className='text-gray-400 text-center'>
                        {parseTime(order.createdAt)}
                      </span>
                    </div>
                    <div className='flex gap-2'>
                      {/* Edit button */}
                      <Link
                        href={'/orders/' + order._id}
                        className='button whitespace-nowrap'
                        style={{ padding: 8 }}>
                        {/* <InfoCircle size={16} /> */}
                        Show order
                      </Link>
                      {/* Delete */}
                      {/* <DeleteButton
                    label=''
                    // onDelete={() => {}}
                  /> */}
                    </div>
                  </div>
                </div>
                {/* Buttons */}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
