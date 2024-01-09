export default function UserAddressInputs({
  addressProps,
  setAddressProp,
  disabled = false,
  required = false,
}) {
  const { phone, streetAddress, postalCode, city, country } = addressProps;

  return (
    <>
      <label>Phone number</label>
      <input
        value={phone || ''}
        disabled={disabled}
        required={required}
        onChange={(ev) => setAddressProp('phone', ev.target.value)}
        type='tel'
        placeholder='Phone number'
      />
      <label>Street address</label>
      <input
        value={streetAddress || ''}
        disabled={disabled}
        required={required}
        onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
        type='text'
        placeholder='Street address'
      />
      <div className='flex gap-2'>
        <div className='grow'>
          <label>Postal code</label>
          <input
            // style={{ marginTop: 0 }}
            className='my-0 !mt-0'
            value={postalCode || ''}
            disabled={disabled}
            required={required}
            onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
            type='text'
            placeholder='Postal code'
          />
        </div>
        <div className='grow'>
          <label>City</label>
          <input
            // style={{ marginTop: 0 }}
            className='!mt-0'
            value={city || ''}
            disabled={disabled}
            required={required}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
            type='text'
            placeholder='City'
          />
        </div>
      </div>
      <label>Country</label>
      <input
        value={country || ''}
        disabled={disabled}
        required={required}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
        type='text'
        placeholder='Country'
      />
    </>
  );
}
