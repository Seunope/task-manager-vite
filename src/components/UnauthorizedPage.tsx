import Button from './Button';
import image from '../img/logo.png';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center
     justify-center min-h-screen bg-gray-100 text-center p-4"
    >
      <img src={image} alt="" className="mx-auto w-28 sm:w-32" />

      <div className="bg-white shadow-lg rounded-lg p-8 md:p-16 max-w-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">
          Sorry, you are unauthorized to access this page.
        </p>
        <p className="text-md mt-8 mb-12">
          <i className="text-RED">No Access</i>
        </p>

        <Button variant="solid" onClick={() => navigate('/')}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
