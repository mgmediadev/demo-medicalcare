import Link from 'next/link';
import { navType } from '@/types';

interface NavProps extends navType {
  closeMobileNav: () => void;
  state: boolean;
  isMobile: boolean;
}

const Nav = ({ closeMobileNav, icon: IconComponent, label, url, state, isMobile }: NavProps) => {
  return (
    <li className='lg:my-2'>
      <Link
        aria-label={label}
        href={url}
        className='h-20 p-4 flex items-center bg-transparent hover:bg-medblue hover:text-white text-medblue'
        onClick={() => closeMobileNav()}
      >
        <IconComponent className='w-[36px] h-[36px]' />
        {isMobile || state ? <span className='ms-2 text-md'>{label}</span> : null}
      </Link>
    </li>
  );
};

export default Nav;
