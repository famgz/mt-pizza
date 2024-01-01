'use client';

import EditableImage from '@/components/layout/EditableImage';
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps';
import { useEffect, useState } from 'react';

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [extraIngredients, setExtraIngredients] = useState(
    menuItem?.extraIngredients || []
    );
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => setCategories(categories));
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredients,
          category,
        })
      }
      className='mt-8 max-w-md mx-auto'
    >
      <div
        className='grid items-start gap-4'
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <EditableImage link={image} setLink={setImage} />
        </div>
        <div className='grow'>
          <label>Item name</label>
          <input
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type='text'
          />

          <label>Description</label>
          <input
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type='text'
          />

          <label>Category</label>
          <select value={category} onChange={ev => setCategory(ev.target.value)}>
            {categories?.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          <label>Base Price</label>
          <input
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
            type='text'
          />

          <MenuItemPriceProps name={'size'} props={sizes} setProps={setSizes} />

          <MenuItemPriceProps
            name={'extra ingredient'}
            props={extraIngredients}
            setProps={setExtraIngredients}
          />

          <button type='submit'>Save</button>
        </div>
      </div>
    </form>
  );
}
