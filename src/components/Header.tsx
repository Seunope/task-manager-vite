import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }: { user: { name: string } }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Task Manager</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 hidden sm:inline">{user.name}</span>
        <FaUserCircle className="text-2xl text-gray-700" />
        <button
          onClick={() => navigate('/')}
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
