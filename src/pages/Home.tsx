import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const Home = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h5 className="text-center mb-4 text-primary font-semibold">Simple Task Management App</h5>

        <h1 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <p className="text-center mt-4">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;
