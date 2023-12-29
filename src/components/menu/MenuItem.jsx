import Image from "next/image";

export default function MenuItem(params) {
  return (
    <div className='bg-gray-200 p-4 rounded-lg text-center hover:bg-gray-50 hover:shadow-md hover:shadow-black/25 transition-all'>
      <div className="text-center">
        <img src='/pizza.png' alt='pizza' className="max-h-auto max-h-24 block mx-auto" />
      </div>
      <h4 className='font-semibold text-xl my-3'>Pepperoni Pizza</h4>
      <p className='text-gray-500 text-sm'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
        eaque fugit alias voluptas necessitatibus sunt illum similique.
      </p>
      <button className='mt-4 bg-primary text-white rounded-full px-8 py-2 w'>
        Add to cart $12
      </button>
    </div>
  );
}
