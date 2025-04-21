import { FaBriefcase } from 'react-icons/fa6';

export default function Home() {
  return (
    <div className='w-full h-[88vh] flex flex-col items-center justify-center text-center'>
      <FaBriefcase className='text-6xl text-medblue mb-4' aria-label='Brief Icon' />
      <h3 className='text-2xl'>
        This section was not built
        <br />
        for this exercise.
      </h3>
    </div>
  );
}
