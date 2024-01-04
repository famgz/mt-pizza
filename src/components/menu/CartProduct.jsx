'use client';

import { cartProductTotalPrice } from '@/components/AppContext';
import Trash from '@/icons/Trash';
import Image from 'next/image';

export default function CartProduct({ product, index = 0, onRemove }) {
  return (
    <div className='flex gap-4 mb-2 border-b py-2'>
      <div className='w-32'>
        <Image src={product.image} alt={''} width={240} height={240} />
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
        {!!onRemove && (
          <button onClick={() => onRemove(index)} className='p-2'>
            <Trash />
          </button>
        )}
      </div>
    </div>
  );
}
