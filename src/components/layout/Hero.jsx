import Right from '@/icons/Right';
import Image from 'next/image';

export default function Hero(params) {
  return (
    <section className='hero mt-4'>
      <div className='py-12'>
        <h1 className='text-4xl font-semibold'>
          Everything <br /> is better <br /> with a{' '}
          <span className='text-primary'>Pizza</span>
        </h1>
        <p className='my-6 text-gray-500 text-sm'>
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className='flex gap-4 text-sm'>
          <button className='flex justify-center bg-primary uppercase flex items-center gap-2 text-white px-4 py-2 rounded-full '>
            Order now
            <Right />
          </button>
          <button className='flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold'>
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className='relative w-full h-full'>
        <Image
        className='w-full h-full'
          src={'/pizza.png'}
          width={350}
          height={350}
          alt={''}
        />
      </div>
    </section>
  );
}
