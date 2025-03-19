import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CentralState, persistor } from '../config/redux/store';
import { UserState } from '../config/redux/reducers/userSlice';
import { AUTH_CONSTANTS } from '../constants/auth';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector<CentralState, UserState>((state) => state.user);

  const handleLogout = () => {
    persistor.purge(); //official way
    // localStorage.removeItem('persist:root'); //manual way: retain data in memory until page reload
    localStorage.removeItem(AUTH_CONSTANTS.AUTH_TOKEN);
    localStorage.removeItem(AUTH_CONSTANTS.USER);
    toast.info('Logo out successful');

    navigate('/');
  };

  console.log('user', user);

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 hidden sm:inline">{user?.name}</span>
        <FaUserCircle className="text-2xl text-gray-700" />
        <button
          onClick={() => handleLogout()}
          className="
            bg-red-500 
            text-white 
            px-4 
            py-2 
            rounded-md 
            hover:bg-red-600 
            text-sm 
            sm:text-base
          "
        >
          Logout
        </button>
      </div>
    </header>
  );
};

Header.displayName = 'Header';

export default Header;
