import Image from 'next/image';

export default function MenuItem({
  image,
  name,
  description,
  category,
  basePrice,
  sizes,
  extraIngredients,
}) {
  return (
    <div className='card flex flex-col justify-between bg-gray-200 p-4 rounded-lg text-center '>
      <div className='text-center'>
        <img
          src={image || '/default-image.jpg'}
          alt='pizza'
          className='max-h-auto block mx-auto'
        />
        <h4 className='font-semibold text-xl my-3'>{name}</h4>
        <p className='text-gray-500 text-sm line-clamp-3'>{description}</p>
      </div>
      <button className='mt-4 bg-primary text-white rounded-full px-8 py-2 w'>
        Add to cart ${basePrice}
      </button>
    </div>
  );
}
