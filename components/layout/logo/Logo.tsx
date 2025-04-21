import Image from 'next/image';
import Link from 'next/link';
import { SITENAME } from '@/globals';

interface LogoProps {
  closeMobileNav: () => void;
  state: boolean;
  isMobile: boolean;
}

const Logo = ({ closeMobileNav, state, isMobile }: LogoProps) => (
  <div className='h-16 w-full flex items-center justify-content-center px-3'>
    <Link href='/' onClick={() => closeMobileNav()}>
      {isMobile ? (
        <Image src='/logo_full.svg' alt={SITENAME} width={140} height={38} />
      ) : state ? (
        <Image src='/logo_full.svg' alt={SITENAME} width={140} height={38} />
      ) : (
        <Image src='/logo_iso.svg' alt={SITENAME} width={38} height={38} />
      )}
    </Link>
  </div>
);
export default Logo;
