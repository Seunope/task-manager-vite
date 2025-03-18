import { BsCart3 } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import avatar from '../img/image-placeholder.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { AppDispatch, RootState } from '../config/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { fetchSearchSKUWithPrice, fetchSKUsForSale } from '../config/redux/actions/productActions';
import { PAGE_ROUTES } from '../constants/pageRoutes';

type DesktopHeaderProps = {
  searchBar: boolean;
  currentPage?: number;
};

function DesktopHeader({ searchBar, currentPage }: DesktopHeaderProps) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { itemCount } = useSelector((state: RootState) => state.cart);
  const image = useSelector((state: RootState) => state.user.image);

  const query = new URLSearchParams(search);
  const businessContactId = query.get('businessContactId');
  const businessId = query.get('businessId');
  const visitId = query.get('visitId');

  useEffect(() => {
    //  const delayDebounceFn = setTimeout(() => {
    if (window.screen.width >= 640) {
      if (searchQuery.length > 2) {
        dispatch(fetchSearchSKUWithPrice(searchQuery));
      } else if (!searchQuery && currentPage) {
        dispatch(fetchSKUsForSale({ subCategoryId: '', page: currentPage }));
        // console.log('Desktop view');
      } else if (!searchQuery && !currentPage) {
        dispatch(fetchSKUsForSale({ subCategoryId: '' }));
      } else {
        null;
      }
    }
    // }, 500);

    // return () => clearTimeout(delayDebounceFn);
  }, [currentPage, dispatch, searchQuery]);

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // console.log(searchQuery);
  };

  const handleNavigateToCart = () => {
    // console.log({ businessContactId });
    const cartRoute = businessId
      ? `${PAGE_ROUTES.CART}?businessId=${businessId}&businessContactId=${businessContactId}&visitId=${visitId}`
      : PAGE_ROUTES.CART;
    navigate(cartRoute);
  };

  return (
    <>
      {!searchBar ? (
        <div
          className="hidden md:w-3/4 lg:w-4/5 md:flex 
        items-center justify-end fixed top-0 right-0 z-30 bg-WHITE h-16 text-2xl sm:text-lg px-8 "
        >
          <div className="flex items-center gap-6">
            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
            <img
              src={image || avatar}
              alt=""
              className="rounded-full object-cover w-16 h-16 sm:w-10 sm:h-10 cursor-pointer"
              onClick={() => navigate('/profile')}
            />
          </div>
        </div>
      ) : (
        <div
          className="hidden md:w-3/4 lg:w-4/5 
        fixed top-0 right-0 z-30 md:flex items-center 
        justify-between bg-WHITE h-16 text-2xl sm:text-xl px-8"
        >
          <div className="hidden sm:flex w-full relative items-center">
            <input
              type="text"
              className="w-3/6 h-8 rounded-2xl text-sm  
              outline-none text-GREY pl-10 pr-4 sm:bg-LIGHT_GREY/15 placeholder:text-sm"
              placeholder="Search"
              onChange={handleSearchQuery}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-sm text-GREY absolute left-5"
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="relative cursor-pointer" onClick={handleNavigateToCart}>
              <p
                className={`w-3 h-3 flex justify-center 
                  items-center text-[0.5rem] text-WHITE
                    rounded-full bg-RED absolute bottom-3 left-3 ${!itemCount ? 'hidden' : null}`}
              >
                {itemCount}
              </p>
              <BsCart3 className="text-xl cursor-pointer" />
            </div>

            <FontAwesomeIcon icon={faBell} className="cursor-pointer" />
            <img
              src={image || avatar}
              alt=""
              className="rounded-full object-cover w-16 h-16 sm:w-12 sm:h-12 cursor-pointer"
              onClick={() => navigate('/profile')}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DesktopHeader;
