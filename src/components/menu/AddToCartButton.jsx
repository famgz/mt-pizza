import FlyingButton from 'react-flying-item';

export default function AddToCartButton({
  hasSizesOrExtras,
  onClick,
  basePrice,
  image,
}) {
  if (!hasSizesOrExtras) {
    return (
      <div 
      onClick={onClick}
      className='flying-button-parent mt-4'>
        <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
          <span>Add to cart ${basePrice}</span>
        </FlyingButton>
      </div>
    );
  }

  return (
    <button
      type='button'
      onClick={onClick}
      className='mt-4 bg-primary text-white rounded-full px-8 py-2 flex items-center text-center justify-center'
    >
      <span className='whitespace-nowrap'>
        Add to cart (from ${basePrice}) <span className='text-xl'>+</span>
      </span>
    </button>
  );
}
