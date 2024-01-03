import Plus from '@/icons/Plus';

export default function AddToCartButton({hasSizesOrExtras, onClick, basePrice}) {
  return (
    <button
    type='button'
    onClick={onClick}
    className='mt-4 bg-primary text-white rounded-full px-8 py-2 justify-center'
  >
    {hasSizesOrExtras ? (
      <>
        <span>From ${basePrice}</span>
        <Plus size={18} />
      </>
    ) : (
      <span>Add to cart ${basePrice}</span>
    )}
  </button>
  )
};
