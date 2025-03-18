import { useEffect, useState } from 'react';
import { GoLock } from 'react-icons/go';
import { TbLogout2 } from 'react-icons/tb';
import { HiOutlineUser } from 'react-icons/hi2';
import { FaChevronRight } from 'react-icons/fa6';
import { IoIosInformationCircleOutline, IoIosNotificationsOutline } from 'react-icons/io';

import Privacy from './Privacy';
import HelpCenter from './HelpCenter';
import Navbar from '../components/Navbar';
import Notifications from './Notifications';
import PersonalDetails from './PersonalDetails';
import Logout from '../pages/auth/user/Logout';
import avatar from '../img/image-placeholder.jpg';
import NavbarDesktop from '../components/NavbarDesktop';
import { useSelector } from 'react-redux';
import { CentralState } from '../config/redux/store';
import { UserType } from '../config/redux/reducers/userSlice';

const Profile = () => {
  const [menuOptions, setMenuOptions] = useState<string>('');
  const [logoutModal, setLogoutModal] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('notifications');
  const user = useSelector<CentralState, UserType>((state) => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function handleMenuOptions() {
    setMenuOptions('');
  }

  function handleLogoutModal() {
    setLogoutModal(!logoutModal);
  }

  return (
    <div>
      <Navbar />

      <div className=" md:flex w-full h-dvh ">
        <NavbarDesktop />
        <div className="w-dvw h-full sm:w-full md:w-3/4 lg:w-4/5 md:pt-0 overflow-y-auto">
          {logoutModal && <Logout onSetLogoutModal={handleLogoutModal} />}
          <div className="w-full h-full md:flex items-start ">
            {menuOptions === 'Edit Personal Details' && (
              <div className="w-full h-full md:hidden absolute top-0 bg-WHITE">
                <PersonalDetails onSetMenuOptions={handleMenuOptions} />
              </div>
            )}
            {menuOptions === 'notifications' && (
              <div className="w-full h-full md:hidden absolute top-0 bg-WHITE">
                <Notifications onSetMenuOptions={handleMenuOptions} />
              </div>
            )}

            {menuOptions === 'privacy-policy' && (
              <div className="w-full h-full md:hidden absolute top-0 bg-WHITE">
                <Privacy onSetMenuOptions={handleMenuOptions} />
              </div>
            )}

            {menuOptions === 'help-center' && (
              <div className="w-full h-full md:hidden absolute top-0 bg-WHITE">
                <HelpCenter onSetMenuOptions={handleMenuOptions} />
              </div>
            )}

            <div
              className=" md:w-2/5 pt-28 pb-8 md:pt-14 md:pb-14 flex 
            flex-col items-center sm:bg-BACKGROUND/50 h-dvh"
            >
              <img
                src={user?.image || avatar}
                alt=""
                className="rounded-full w-24 h-24 object-cover"
              />
              <h1 className="mt-4 mb-1 text-lg font-semibold">
                {`${user?.firstName} ${user?.lastName}`}
              </h1>
              <p className="text-grey-1 text-sm font-medium">{user?.phoneNumber}</p>
              <div className="w-full h-full hidden md:block">
                <PersonalDetails onSetMenuOptions={handleMenuOptions} />
              </div>
              <div className="mt-10 w-full sm:w-1/2  px-8 font-semibold md:hidden">
                <div
                  className="flex items-center justify-between cursor-pointer pb-2"
                  onClick={() => setMenuOptions('Edit Personal Details')}
                >
                  <p className="flex items-center gap-2">
                    <HiOutlineUser className="text-xl" />
                    Edit Personal Details
                  </p>
                  <FaChevronRight />
                </div>
                <div
                  className="flex items-center justify-between cursor-pointer py-2"
                  onClick={() => setMenuOptions('notifications')}
                >
                  <p className="flex items-center gap-2">
                    <IoIosNotificationsOutline className="text-xl" />
                    Notification
                  </p>
                  <FaChevronRight />
                </div>
                <div
                  className="flex items-center justify-between cursor-pointer py-2"
                  onClick={() => setMenuOptions('help-center')}
                >
                  <p className="flex items-center gap-2">
                    <IoIosInformationCircleOutline className="text-xl" />
                    Help Center
                  </p>
                  <FaChevronRight />
                </div>
                <div
                  className="flex items-center justify-between cursor-pointer py-2"
                  onClick={() => setMenuOptions('privacy-policy')}
                >
                  <p className="flex items-center gap-2">
                    <GoLock className="text-lg" />
                    Privacy Policy
                  </p>
                  <FaChevronRight />
                </div>
                <p
                  className="flex items-center gap-2 text-RED cursor-pointer py-2"
                  onClick={handleLogoutModal}
                >
                  <TbLogout2 className="text-xl" />
                  Log out
                </p>
              </div>
            </div>

            <div className="w-3/5 h-full px-16 md:px-6 pt-8 pb-4 hidden md:block">
              <div className="  flex items-center justify-between text-BLACK font-semibold mb-10">
                <p
                  className={`py-3 px-6 ${
                    currentTab === 'notifications' && 'bg-PRIMARY text-WHITE '
                  } rounded-md cursor-pointer`}
                  onClick={() => setCurrentTab('notifications')}
                >
                  Notifications
                </p>
                <p
                  className={`py-3 px-6 ${
                    currentTab === 'help-center' && 'bg-PRIMARY text-WHITE '
                  } rounded-md cursor-pointer text-center`}
                  onClick={() => setCurrentTab('help-center')}
                >
                  Help Center
                </p>
                <p
                  className={`py-3 px-6 ${
                    currentTab === 'privacy' && 'bg-PRIMARY text-WHITE '
                  } rounded-md cursor-pointer`}
                  onClick={() => setCurrentTab('privacy')}
                >
                  Privacy
                </p>
              </div>
              {currentTab === 'notifications' ? (
                <Notifications onSetMenuOptions={handleMenuOptions} />
              ) : currentTab === 'help-center' ? (
                <HelpCenter onSetMenuOptions={handleMenuOptions} />
              ) : currentTab === 'privacy' ? (
                <Privacy onSetMenuOptions={handleMenuOptions} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
