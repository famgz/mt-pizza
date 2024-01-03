export default function UserAddressInputs({ addressPops, setAddressProp }) {
  const { phone, streetAddress, postalCode, city, country } = addressPops;

  return (
    <>
      <label>Phone number</label>
      <input
        value={phone}
        onChange={(ev) => setAddressProp('phone', ev.target.value)}
        type='tel'
        placeholder='Phone number'
      />
      <label>Street address</label>
      <input
        value={streetAddress}
        onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
        type='text'
        placeholder='Street address'
      />
      <div className='flex gap-2'>
        <div className='grow'>
          <label>Postal code</label>
          <input
            style={{ marginTop: 0 }}
            className='my-0'
            value={postalCode}
            onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
            type='text'
            placeholder='Postal code'
          />
        </div>
        <div className='grow'>
          <label>City</label>
          <input
            style={{ marginTop: 0 }}
            value={city}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
            type='text'
            placeholder='City'
          />
        </div>
      </div>
      <label>Country</label>
      <input
        value={country}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
        type='text'
        placeholder='Country'
      />
    </>
  );
}
