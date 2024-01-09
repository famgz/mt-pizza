import { useState } from 'react';
import Trash from '@/icons/Trash';

export default function DeleteButton({ label, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);

  // delete confirmation modal
  if (showConfirm) {
    return (
      <div className='fixed bg-black/80 inset-0 flex items-center h-full justify-center'>
        <div className='bg-white p-4 rounded-lg'>
          <div className=''>Are you sure you want to delete?</div>
          <div className='flex gap-2 mt-4'>
            <button type='button' onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              type='button'
              className='primary'
              onClick={() => {
                setShowConfirm(false);
                onDelete();
              }}
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button className='items-center p-2' type='button' onClick={() => setShowConfirm(true)}>
      {label}
      <Trash size={18} />
    </button>
  );
}
