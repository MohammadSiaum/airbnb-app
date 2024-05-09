'use client'

import React, { useCallback } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { TbPhotoPlus } from 'react-icons/tb';
import Image from 'next/image';


const ImageUpload = ({
    onChange,
    value

}) => {
    const handleUpload = useCallback((result) => {
        onChange(result.info.secure_url);

    }, [onChange])
    return (
        <CldUploadWidget 
           onUploadAdded={handleUpload}
           uploadPreset='kw9tsrgt'
           options={{
             maxFiles: 1
           }}
        >
            {({ open }) => {
                return (
                    <div
                      onClick={() => open?.()}
                      className='
                         relative
                         cursor-pointer
                         hover:opacity-70
                         transition
                         border-dashed
                         border-2
                         p-20
                         border-neutral-300
                         flex
                         flex-col
                         justify-center
                         items-center
                         gap-4
                         text-neutral-600
                      '
                    >
                        <TbPhotoPlus size={50} />
                        <h3 className='font-semibold text-lg'>
                            Click to upload
                        </h3>

                        {value && (
                            <div
                              className='absolute inset-0 w-full h-full'
                            >
                                <Image
                                  alt='Upload'
                                  fill
                                  style={{objectFit: 'cover'}}
                                  src={value}
                                />
                            </div>
                        )}

                    </div>
                )
            }}
        </CldUploadWidget>
    );
};

export default ImageUpload;