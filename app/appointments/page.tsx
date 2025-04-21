'use client';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { removeAppointment } from '@/redux/slices/appointmentSlice';
import Link from 'next/link';

const Books = () => {
  const dispatch = useAppDispatch();
  const { appointments, loading } = useAppSelector((state) => state.appointments);

  const handleDelete = (id: string) => {
    if (confirm('¿Are you sure you want to delete this appointment?')) {
      dispatch(removeAppointment(id));
    }
  };

  if (loading) {
    return <div className='text-center my-8'>Loading...</div>;
  }

  return (
    <>
      <h1 className='mb-4'>Appointments</h1>

      <div className='w-full overflow-x-auto'>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Specialty</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appointments.length ? (
              [...appointments]
                .sort((a, b) => {
                  const dateA = new Date(a.datetime);
                  const dateB = new Date(b.datetime);

                  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;

                  return dateA.getTime() - dateB.getTime();
                })
                .map(({ id, datetime, name, specialty, location }) => {
                  const showDate = new Date(datetime).toLocaleString('es-ES', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  });

                  return (
                    <tr key={id}>
                      <td className='w-50'>{showDate}</td>
                      <td>{name}</td>
                      <td>{specialty}</td>
                      <td>{location}</td>
                      <td className='text-center w-25 !min-w-25'>
                        <button
                          type='button'
                          onClick={() => handleDelete(id)}
                          aria-label={`Delete appointment for ${name} on ${showDate} hrs.`}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
            ) : (
              <tr>
                <td colSpan={5} className='text-center h-50'>
                  No scheduled appointments.
                  <br />
                  Go to the{' '}
                  <Link href='/doctors' className='text-medblue hover:underline'>
                    Doctors section
                  </Link>{' '}
                  to schedule an appointment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Books;
