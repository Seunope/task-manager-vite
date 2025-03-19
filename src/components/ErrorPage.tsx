import Button from './Button';
import { useNavigate, useRouteError } from 'react-router-dom';

type Error = { message?: string; statusText?: string };

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div
      className="flex flex-col items-center 
    justify-center min-h-screen bg-gray-100 text-center p-4"
    >
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-16 max-w-lg">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
        <p className="text-gray-700 text-lg mb-6">Sorry, an unexpected error has occurred.</p>
        <p className="text-md mt-8 mb-12">
          The likely reason is: <i className="text-RED">{error.statusText || error.message}</i>
        </p>

        <Button onClick={() => navigate('/')}>Go Back Home</Button>
      </div>
    </div>
  );
}
