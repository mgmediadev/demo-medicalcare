'use client';
import Image from 'next/image';
import { doctorData } from '@/types';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa6';

interface DoctorCardProps {
  clickButton: (opc: boolean, data: doctorData) => void;
  data: doctorData;
}

const DoctorCard = ({ clickButton, data }: DoctorCardProps) => {
  const { name, location, photo, specialty, rating } = data;

  const [imageSrc, setImageSrc] = useState(photo || '/no-user.png');
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setImageSrc('/no-user.png');
      setHasError(true);
    }
  };

  return (
    <article className='text-center relative' aria-label={`${name}, ${specialty} in ${location}`}>
      <div className='flex space-x-1 absolute right-2 top-14 items-center'>
        <span className='text-black text-xs'>{rating}</span>
        <FaStar className='text-yellow-600 m-0' />
      </div>
      <div className='flex items-center w-full h-18'>
        <div className='w-18 h-18 rounded-full overflow-hidden relative border border-gray-400 bg-gray-200'>
          <Image src={imageSrc} layout='fill' objectFit='cover' alt={name} onError={handleError} />
        </div>
        <div className='grow ms-2 text-start'>
          <h2 className='text-lg text-medblue mb-0'>{name}</h2>
          <p className='mb-0'>{specialty}</p>
          <p className='text-xs mb-0'>{location}</p>
        </div>
      </div>

      <hr className='my-2 text-gray-400' />

      <button
        type='button'
        className='mx-auto'
        aria-label={`Book Appointment for ${name}`}
        onClick={() => clickButton(true, data)}
      >
        Book Appointment
      </button>
    </article>
  );
};

export default DoctorCard;
