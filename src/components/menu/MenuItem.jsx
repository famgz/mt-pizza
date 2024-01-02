import Image from 'next/image';
import { useContext, useState } from 'react';
import { CartContext } from '../AppContext';
import MenuItemTile from '@/components/menu/MenuItemTile';
import toast from 'react-hot-toast';

export default function MenuItem(menuItem) {
  const {
    image,
    name,
    description,
    category,
    basePrice,
    sizes,
    extraIngredients,
  } = menuItem;

  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [selectedExtras, setSelectedExtras] = useState([]);

  function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredients.length > 0;
    // items with extra options, go to modal
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return
    }
    // items ready to the cart
    addToCart(menuItem, selectedSize, selectedExtras);
    setShowPopup(false);
    toast.success('Added to cart!');
  }

  function handleExtraItemClick(ev, extra) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extra]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extra.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) selectedPrice += selectedSize.price;

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {/* Items with no extra options */}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
      
      {/* Items with extra options */}
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className='fixed inset-0 flex items-center h-full justify-center bg-black/80'
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className='bg-white my-8 p-2 rounded-lg max-w-md'
          >
            <div
              className='overflow-y-scroll p-2'
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
              <Image
                className='mx-auto'
                src={image}
                alt={name}
                width={300}
                height={300}
              />
              <h2 className='text-lg font-bold text-center mb-2'>{name}</h2>
              <p className='text-center text-gray-500 text-sm mb-2'>
                {description}
              </p>
              {sizes?.length > 0 && (
                <div className='p-2'>
                  <h3 className='text-center text-gray-700 mb-2'>
                    Pick your size
                  </h3>
                  {sizes.map((size, index) => (
                    <label
                      key={index}
                      className='flex items-center gap-2 p-2 border rounded-md mb-1 ml-0 capitalize'
                    >
                      <input
                        type='radio'
                        name='size'
                        onClick={() => setSelectedSize(size)}
                        checked={selectedSize?.name === size.name}
                      />{' '}
                      {size.name}
                      <span className='text-gray-900 font-bold'>
                        ${basePrice + size.price}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              {extraIngredients?.length > 0 && (
                <div className='p-2'>
                  <h3 className='text-center text-gray-700 mb-2'>
                    Any extras?
                  </h3>
                  {extraIngredients.map((extra, index) => (
                    <label
                      key={index}
                      className='flex items-center gap-2 p-2 border rounded-md mb-1 ml-0 capitalize'
                    >
                      <input
                        type='checkbox'
                        name={extra.name}
                        onClick={(ev) => handleExtraItemClick(ev, extra)}
                      />
                      Extra {extra.name}
                      <span className='text-gray-900 font-bold'>
                        +${extra.price}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              <div className='flex gap-2 mt-4 sticky bottom-0 bg-white'>
                <button
                  className='w-auto'
                  type='button'
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddToCartButtonClick}
                  className='primary grow'
                  type='button'
                >
                  Add to cart ${selectedPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
