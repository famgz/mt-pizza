import Image from 'next/image';
import toast from 'react-hot-toast';

export default function EditableImage({ link, setLink }) {
  async function handleFileChange(ev) {
    const files = ev.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((imageLink) => {
            console.log(imageLink);
            setLink(imageLink);
          });
        }
        throw new Error('Something went wrong');
      });

      await toast.promise(
        uploadingPromise,
        {
          loading: 'Uploading...',
          success: 'Upload done!\nClick Save to complete',
          error: 'upload error',
        },
        {
          success: {
            duration: 5000,
          },
        }
      );
    }
  }

  return (
    <>
      {link && (
        <Image
          className='rounded-lg w-full h-full mb-1'
          src={link}
          width={250}
          height={250}
          alt=''
        />
      )}
      {!link && (
        <div className='text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1'>No image</div>
      )}
      <label className='m-0'>
        <input type='file' className='hidden' onChange={handleFileChange} />
        <span className='w-full block border border-gray-300 text-center rounded-lg px-2 py-1 cursor-pointer'>
          Edit
        </span>
      </label>
    </>
  );
}
