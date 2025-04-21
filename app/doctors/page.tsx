'use client';
import { useEffect, useState } from 'react';
import { doctorData } from '@/types';
import DoctorCard from '@/doctors/card/Card';
import Modal from '@/layout/modal/Modal';

const Doctors = () => {
  const [doctorList, setDoctorList] = useState<doctorData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [specialtyList, setspecialtyList] = useState<string[]>([]);
  const [specialtySelected, setSpecialtySelected] = useState('All');
  const [doctorSelected, setDoctorSelected] = useState<doctorData>(DoctorEmpty);
  const [orderSelected, setOrderSelected] = useState('ASC');

  const handleSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSpecialtySelected(event.target.value);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setOrderSelected(event.target.value);

  const handleModal = (opc: boolean, data: null | doctorData = null) => {
    if (data) setDoctorSelected(data);
    setIsModalOpen(opc);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch('./doctors.json');
      const json = await data.json();
      const doctorJson = json.doctors;

      const sortedDoctors = [...doctorJson].sort((a, b) => a.name.localeCompare(b.name));

      setDoctorList(sortedDoctors);

      const specialties = [
        ...new Set(doctorJson.map((doctor: doctorData) => doctor.specialty)),
      ] as string[];
      const specialtiesSort = specialties.sort();

      setspecialtyList(specialtiesSort);
    };

    fetchData();
  }, []);

  return (
    <>
      <Modal data={doctorSelected} isOpen={isModalOpen} closeModal={handleModal} />
      <div className='w-full lg:flex justify-between items-center mb-4'>
        <h1>Doctors</h1>
        <form action='#' className='lg:flex lg:space-x-4 space-y-2'>
          <fieldset>
            <label htmlFor='filter_specialty'>Specialty</label>
            <select id='filter_specialty' onChange={handleSpecialtyChange}>
              <option value='All'>All</option>
              <option value='' disabled>
                --------------
              </option>
              {specialtyList.map((elem: string, index: number) => (
                <option value={elem} key={index}>
                  {elem}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor='filter_availability' className='ms-4'>
              Availability
            </label>
            <select id='filter_availability' name='filter_availability'>
              <option value=''>All</option>
              <option value='' disabled>
                --------------
              </option>
            </select>
          </fieldset>

          <fieldset>
            <label htmlFor='filter_sort' className='ms-4'>
              Sort
            </label>
            <select id='filter_sort' onChange={handleSortChange}>
              <option value='ASC'>Name Ascending</option>
              <option value='DESC'>Name Descending</option>
            </select>
          </fieldset>
        </form>
      </div>
      <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {doctorList
          .filter((elem) => specialtySelected === 'All' || elem.specialty === specialtySelected)
          .sort((a, b) => {
            if (orderSelected === 'ASC') {
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
            } else {
              if (b.name < a.name) return -1;
              if (b.name > a.name) return 1;
            }
            return 0;
          })
          .map((elem: doctorData) => (
            <DoctorCard data={elem} clickButton={handleModal} key={elem.id} />
          ))}
      </section>
    </>
  );
};

export default Doctors;

const DoctorEmpty: doctorData = {
  id: 0,
  name: '',
  photo: '',
  specialty: '',
  availability: '',
  rating: 0,
  location: '',
};
