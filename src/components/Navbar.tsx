import { useState } from 'react';
import { BsCart3 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Menu from './Menu';
import { CentralState } from '../config/redux/store';
import { CartState } from '../config/redux/reducers/cartSlice';
import { PAGE_ROUTES } from '../constants/pageRoutes';

function Navbar({ cart = false }) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { itemCount } = useSelector<CentralState, CartState>((state) => state.cart);

  const query = new URLSearchParams(search);
  const businessContactId = query.get('businessContactId');
  const businessId = query.get('businessId');
  const visitId = query.get('visitId');

  const handleNavigateToCart = () => {
    console.log({ businessContactId });
    const cartRoute = businessId
      ? `${PAGE_ROUTES.CART}?businessId=${businessId}&businessContactId=${businessContactId}&visitId=${visitId}`
      : PAGE_ROUTES.CART;
    navigate(cartRoute);
  };

  function handleMenuOpen() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      {isOpen && <Menu onHandleMenu={handleMenuOpen} />}
      {!cart ? (
        <div
          className="w-dvw sm:w-full fixed z-10 left-0 px-4 md:px-8 flex 
        justify-between items-center h-20 text-xl sm:text-xl bg-WHITE md:hidden "
        >
          <FontAwesomeIcon icon={faBars} onClick={handleMenuOpen} className="cursor-pointer" />
          <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
        </div>
      ) : (
        <div
          className="w-dvw sm:w-full fixed z-10 left-0 px-8 flex 
        justify-between items-center h-20 text-xl sm:text-xl bg-WHITE md:hidden"
        >
          <FontAwesomeIcon icon={faBars} onClick={handleMenuOpen} className="cursor-pointer" />
          <div className="space-x-6 flex items-center">
            <div className="relative cursor-pointer" onClick={handleNavigateToCart}>
              <p
                className={`w-3 h-3 flex justify-center items-center
                   text-[0.5rem] text-WHITE  rounded-full bg-RED 
                   absolute bottom-3 left-3 ${!itemCount && 'hidden'}`}
              >
                {itemCount}
              </p>
              <BsCart3 className="text-xl cursor-pointer" />
            </div>

            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
