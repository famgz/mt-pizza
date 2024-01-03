import AddToCartButton from '@/components/menu/AddToCartButton';

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredients } = item;

  const hasSizesOrExtras = sizes?.length > 0 || extraIngredients?.length > 0;

  return (
    <div className='card flex flex-col justify-between bg-gray-200 p-4 rounded-lg text-center '>
      <div className='text-center'>
        <img
          src={image || '/default-image.jpg'}
          alt='pizza'
          className='max-h-auto block'
        />
        <h4 className='font-semibold text-xl my-3'>{name}</h4>
        <p className='text-gray-500 text-sm line-clamp-3'>{description}</p>
      </div>

      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
}
