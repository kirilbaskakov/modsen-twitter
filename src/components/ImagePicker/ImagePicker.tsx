import { useState } from 'react';

import ImagePlaceholder from '@/assets/image-placeholder.svg';

interface ImagePickerProps {
  defaultImage: string | undefined;
  onChange: (file: File) => void;
}

const ImagePicker = ({ defaultImage, onChange }: ImagePickerProps) => {
  const [preview, setPreview] = useState('');

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file);
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-28 h-28 rounded-full group">
      <img
        className="w-full h-full rounded-full object-cover"
        src={preview || defaultImage || ImagePlaceholder}
      />
      <label
        className="hidden absolute text-gray-200 font-bold text-3xl top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-black 
                  opacity-60 w-8 h-8 rounded-full justify-center items-center
                  group-hover:flex"
        htmlFor="avatar-input"
      >
        +
      </label>
      <input
        type="file"
        className="hidden"
        id="avatar-input"
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImagePicker;
