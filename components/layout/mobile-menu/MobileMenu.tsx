import { FaBars, FaXmark } from 'react-icons/fa6';

interface MobileMenuProps {
  handleClick: () => void;
  visible: boolean;
}

const MobileMenu = ({ handleClick, visible }: MobileMenuProps) => {
  return (
    <div
      className='h-16 w-16 lg:hidden flex items-center justify-center ms-4'
      onClick={() => handleClick()}
    >
      {visible ? <FaXmark className={SIZE_ICON} /> : <FaBars className={SIZE_ICON} />}
    </div>
  );
};

export default MobileMenu;

const SIZE_ICON = 'text-2xl';
