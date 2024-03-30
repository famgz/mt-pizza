import Right from '@/icons/Right';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='flex mt-4'>
      {/* Slogan section */}
      <div className='py-4 md:py-12 sm:w-full'>
        <h1 className='text-4xl font-semibold'>
          Everything <br /> is better <br /> with a{' '}
          <span className='text-primary'>Pizza</span>
        </h1>
        <p className='my-6 text-gray-500 text-sm'>
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life
        </p>
        <div className='flex gap-4 text-sm'>
          <Link
            href={'/menu'}
            className='flex justify-center items-center bg-primary uppercase gap-2 text-white font-bold px-4 py-2 rounded-full'>
            Order now
            <Right />
          </Link>
          <Link
            href={'/menu'}
            className='flex items-center text-md border-0 gap-2 py-2 text-gray-600 font-semibold'>
            Learn more
            <Right />
          </Link>
        </div>
      </div>
      {/* Pizza image section */}
      <div className='hidden relative grow w-full px-8 sm:block'>
        <Image
          className='w-full'
          src={'/pizza.png'}
          width={350}
          height={350}
          alt={''}
        />
      </div>
    </section>
  );
}
