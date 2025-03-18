import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import image from '../../img/logo.png';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline } from 'react-icons/io5';
import Loader from '../../components/Loader';
import { LOGIN_USER } from '../../config/api/http';
import { AUTH_CONSTANTS } from '../../constants/auth';
import { PAGE_ROUTES } from '../../constants/pageRoutes';
import { updateUser } from '../../config/redux/reducers/userSlice';
import { CustomAxiosErrorType, onError } from '../../config/api/http-mthd';

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [, setError] = useState<string | null>(null);
  const [, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      // console.log('first');
      const response = await axios.post(LOGIN_USER, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success('Hey! Welcome to OpenRetail');
        const { data } = response?.data;
        localStorage.setItem(AUTH_CONSTANTS.AUTH_TOKEN, JSON.stringify(data?.accessToken));
        localStorage.setItem(AUTH_CONSTANTS.REFRESH_TOKEN, JSON.stringify(data?.refreshToken));
        localStorage.setItem(AUTH_CONSTANTS.USER, JSON.stringify(data));

        setSuccess('Sign in successful!');
        dispatch(updateUser(response?.data?.data?.profile));
        if (data?.profile?.role?.name === 'Customer Acquisition Agent') {
          navigate(PAGE_ROUTES.CUSTOMER_ACQUISITION_AGENT_DASHBOARD);
        } else if (data?.profile?.role?.name === 'Sales Representative') {
          navigate(PAGE_ROUTES.SALES_REP_DASHBOARD);
        } else if (data?.profile?.role?.name === 'Tele Sales Agent') {
          navigate(PAGE_ROUTES.TELE_SALES_DASHBOARD);
        } else if (data?.profile?.role?.name === 'Back Office Manager') {
          navigate(PAGE_ROUTES.BACK_OFFICE_DASHBOARD);
        } else if (data?.profile?.role?.name === 'Wholesaler Account Officer') {
          navigate(PAGE_ROUTES.WHOLESALER_ACCOUNT_OFFICER_DASHBOARD);
        } else if (data?.profile?.role?.name === 'Logistics Manager') {
          navigate(PAGE_ROUTES.LM_DASHBOARD);
        } else null;
      } else {
        toast.error(response?.data?.message);
        setError(response?.data?.message);
      }
    } catch (err: unknown | CustomAxiosErrorType) {
      let msg = '';
      const disError = onError(err as CustomAxiosErrorType);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="h-dvh w-dvw sm:h-full sm:w-full pt-24 sm:pt-20 px-12 sm:px-32">
      <img src={image} alt="" className="mx-auto w-28 sm:w-32" />
      <form action="" className=" mt-10 sm:mt-10 sm:w-4/5 md:w-1/2 sm:mx-auto md:mt-16 lg:w-2/5  ">
        {/* {error && <p className="text-RED text-center">{error}</p>}
        {success && <p className="text-PRIMARY text-center">{success}</p>} */}
        <Input
          type="email"
          id="email"
          label="Email"
          className="mt-1 mb-5 "
          placeholder="Type here"
          onChange={handleEmail}
          value={email}
          required
        />

        <Input
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          className="mt-1 mb-5 "
          placeholder="Your password"
          value={password}
          TrailingIcon={() => (
            <span className="cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              <IoEyeOutline />
            </span>
          )}
          onChange={handlePassword}
          required
        />

        <p
          className="my-6 font-semibold text-xs sm:text-sm underline cursor-pointer text-PRIMARY"
          onClick={() => navigate('/forgot-password')}
        >
          Forgot You Password?
        </p>
        <button
          className="w-full h-12 bg-PRIMARY rounded-md text-sm sm:text-base
           text-BACKGROUND font-semibold mt-4"
          onClick={handleSubmit}
        >
          {loading ? <Loader /> : 'Confirm'}
        </button>
      </form>
    </div>
  );
}

export default SignIn;
