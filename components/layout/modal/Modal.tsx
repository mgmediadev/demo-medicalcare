'use client';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState, useRef } from 'react';
import { doctorData } from '@/types';
import { useAppDispatch } from '@/redux/hooks';
import { addAppointment } from '@/redux/slices/appointmentSlice';
import { v4 as uuidv4 } from 'uuid';

interface ModalProps {
  closeModal: (opc: boolean) => void;
  data: doctorData;
  isOpen: boolean;
}

const Modal = ({ closeModal, data, isOpen }: ModalProps) => {
  const dispatch = useAppDispatch();
  const { name, location, photo, specialty } = data;

  const [imageSrc, setImageSrc] = useState('/no-user.png');
  const [dateSelected, setDateSelected] = useState('');
  const [timeSelected, setTimeSelected] = useState('');

  const selectDate = useRef<HTMLInputElement>(null);

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => setDateSelected(event.target.value);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setTimeSelected(event.target.value);

  const handleError = () => setImageSrc('/no-user.png');

  interface Appointment {
    id: string;
    datetime: string;
    name: string;
    specialty: string;
    location: string;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateSelected !== '' && timeSelected !== '') {
      const newAppointment: Appointment = {
        id: uuidv4(),
        datetime: `${dateSelected} ${timeSelected}`,
        name: name,
        specialty: specialty,
        location: location,
      };
      dispatch(addAppointment(newAppointment));
      closeModal(false);
    } else {
      alert('Select a date/time');
    }
  };

  useEffect(() => {
    setImageSrc(photo);
    selectDate.current?.focus();
  }, [photo]);

  return (
    <dialog id='my-modal' className={`modal ${isOpen ? 'open' : ''}`}>
      <div className='bg-white rounded-lg shadow-xl p-6 relative w-9/10 max-w-120 m-8'>
        <h3 className='text-lg font-bold'>Book Appointment</h3>
        <div className='flex items-center w-full h-18 my-6'>
          <div className='w-18 h-18 rounded-full overflow-hidden relative border border-gray-400 bg-gray-200'>
            <Image
              src={imageSrc}
              layout='fill'
              objectFit='cover'
              alt={`${name} profile image`}
              onError={handleError}
            />
          </div>
          <div className='grow ms-2 text-start'>
            <h3 className='text-lg text-medblue mb-0'>{name}</h3>
            <p className='mb-0'>{specialty}</p>
            <p className='text-xs mb-0'>{location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <hr className='my-2 text-gray-400' />

          <p className='text-center mb-4'>Select date/time</p>

          <div className='flex space-x-2'>
            <input
              aria-label='select appointment date'
              ref={selectDate}
              name='date'
              type='date'
              value={dateSelected}
              onChange={handleDate}
              className='text-center'
            />

            <select name='time' onChange={handleTimeChange} aria-label='select appointment time'>
              <option value=''>Select</option>
              <option value='' disabled>
                -----
              </option>
              <option value='9:00:00'>9:00</option>
              <option value='9:30:00'>9:30</option>
              <option value='10:00:00'>10:00</option>
              <option value='10:30:00'>10:30</option>
              <option value='11:00:00'>11:00</option>
              <option value='11:30:00'>11:30</option>
              <option value='12:00:00'>12:00</option>
              <option value='12:30:00'>12:30</option>
              <option value='13:00:00'>13:00</option>
              <option value='13:30:00'>13:30</option>
              <option value='' disabled>
                -----
              </option>
              <option value='15:00:00'>15:00</option>
              <option value='15:30:00'>15:30</option>
              <option value='16:00:00'>16:00</option>
              <option value='16:30:00'>16:30</option>
              <option value='17:00:00'>17:00</option>
              <option value='17:30:00'>17:30</option>
              <option value='18:00:00'>18:00</option>
              <option value='18:30:00'>18:30</option>
              <option value='19:00:00'>19:00</option>
              <option value='19:30:00'>19:30</option>
            </select>
          </div>

          <hr className='my-2 text-gray-400' />

          <div className='flex justify-end mt-4'>
            <button
              type='button'
              className='!bg-medaqua !text-white hover:!bg-medaqua-dark mr-2'
              onClick={() => closeModal(false)}
              aria-label='Close Modal'
            >
              Close
            </button>
            <button
              type='submit'
              aria-label={`Confirm appointment for ${name}, ${specialty} in ${location}`}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
