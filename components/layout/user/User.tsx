import Image from 'next/image';
import Link from 'next/link';

interface userProps {
  closeMobileNav: () => void;
  state: boolean;
}

const User = ({ closeMobileNav, state }: userProps) => (
  <Link
    href='/'
    className='h-16 w-16 md:w-fit flex items-center px-3 text-black group'
    aria-label='User'
    onClick={() => closeMobileNav()}
  >
    <Image
      src='/user.png'
      alt='Jhon Doe'
      width={38}
      height={38}
      priority
      className='rounded-full'
      title='Jhon Doe'
    />
    {state ? <span className='ms-2 text-md group-hover:underline'>Jhon Doe</span> : null}
  </Link>
);

export default User;
