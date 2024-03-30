import Hero from '@/components/layout/Hero';
import HomeMenu from '@/components/layout/HomeMenu';
import SectionHeaders from '@/components/layout/SectionHeaders';

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />

      <section id='about' className='text-center my-16'>
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className='page-content flex flex-col gap-4 text-gray-500'>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
            itaque temporibus a. Hic, delectus quibusdam ducimus reprehenderit
            aliquid dolore dolores cupiditate debitis accusantium, quos, fugit
            doloremque saepe architecto recusandae voluptatum!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores in
            deleniti eum esse nulla fugiat voluptatibus tempora eaque temporibus
            soluta magnam, quisquam, rem quo aliquam animi minus, vel at cumque.
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam,
            perspiciatis. Quos explicabo asperiores, tempore voluptates aliquid.
          </p>
        </div>
      </section>

      <section id='contact' className='text-center my-8'>
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={'Contact us'}
        />
        <div className='mt-8'>
          <a
            className='text-4xl underline text-gray-500'
            href='tel:+55738123456'>
            +55 738 123 456
          </a>
        </div>
      </section>
    </>
  );
}
