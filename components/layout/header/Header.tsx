'use client';
import Logo from '@/layout/logo/Logo';
import User from '@/layout/user/User';
import Nav from '@/layout/nav/Nav';
import { useEffect, useState } from 'react';
import { navType } from '@/types';
import { FaGear, FaRegCalendarDays, FaDesktop, FaUserDoctor } from 'react-icons/fa6';
import useWindowSize from '@/hooks/WindowSize';
import MobileMenu from '@/layout//mobile-menu/MobileMenu';

const Header = () => {
  const { width } = useWindowSize();
  const [state, setState] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);

  const isMobile: boolean = width !== undefined && width > 768 ? false : true;

  const handleMouse = (opc: boolean) => !isMobile && setState(opc);
  const handleClick = () => {
    setVisible(!visible);
  };

  const closeMobileNav = () => isMobile && setVisible(false);

  const headerSyle = {
    width: isMobile ? '100%' : state ? '12rem' : '4rem',
    height: isMobile ? (visible ? `${NAVIGATION.length * 6}rem` : '4rem') : '100vh',
  };

  const navStyle = {
    display: visible ? 'block' : 'hidden',
    position: isMobile ? 'absolute' : 'relative',
    top: isMobile ? '4rem' : '0rem',
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isMobile && setVisible(false);
  }, [isMobile]);

  return (
    <header
      className='bg-white top-0 left-0 fixed flex flex-row lg:flex-col overflow-hidden animation z-50 shadow-lg'
      onMouseOver={() => handleMouse(true)}
      onMouseOut={() => handleMouse(false)}
      style={headerSyle}
    >
      <Logo state={state} isMobile={isMobile} closeMobileNav={closeMobileNav} />

      <nav className='grow bg-white w-full' style={navStyle}>
        <ul>
          {NAVIGATION.map((elem: navType, index: number) => (
            <Nav
              {...elem}
              state={state}
              closeMobileNav={closeMobileNav}
              key={index}
              isMobile={isMobile}
            />
          ))}
        </ul>
      </nav>

      <User state={state} closeMobileNav={closeMobileNav} />

      {isMobile && <MobileMenu handleClick={handleClick} visible={visible} />}
    </header>
  );
};

export default Header;

const NAVIGATION: navType[] = [
  {
    icon: FaDesktop,
    label: 'Dashboard',
    url: '/',
  },
  {
    icon: FaUserDoctor,
    label: 'Doctors',
    url: '/doctors',
  },
  {
    icon: FaRegCalendarDays,
    label: 'Appointments',
    url: '/appointments',
  },
  {
    icon: FaGear,
    label: 'Setup',
    url: '/',
  },
];
