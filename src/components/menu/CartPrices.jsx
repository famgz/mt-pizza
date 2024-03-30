export default function CartPrices({ subTotal, deliveryFee, total }) {
  return (
    <div className='flex justify-end items-center gap-4 py-2'>
      <div className='text-gray-500 text-lg'>
        Subtotal: <br />
        Delivery: <br />
        Total:
      </div>
      <span className='text-lg font-semibold pl-2 text-right'>
        ${subTotal} <br />${deliveryFee} <br />${total} <br />
      </span>
    </div>
  );
}
