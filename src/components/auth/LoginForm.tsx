import * as Yup from 'yup';
import Button from '../Button';
import { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { LOGIN_USER } from '../../config/api/http';
import { onSuccess, CustomAxiosErrorType, onError } from '../../config/api/http-mthd';
import { LoginDTO } from '../../config/utils/types';
import { AUTH_CONSTANTS } from '../../constants/auth';
import { useDispatch } from 'react-redux';
import { addUserData, updateUser } from '../../config/redux/reducers/userSlice';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const doLogin = async (input: LoginDTO) => {
    try {
      setLoading(true);
      const response = await LOGIN_USER(input);
      setLoading(false);
      const res = onSuccess(response);
      if (res && res.status) {
        const { data } = response?.data;
        localStorage.setItem(AUTH_CONSTANTS.AUTH_TOKEN, JSON.stringify(data?.accessToken));
        dispatch(addUserData(data?.user));
        navigate('/dashboard');
        toast.success(res.message || 'An error. Try again');
        return;
      } else {
        toast.error(res.message || 'An error. Try again');
      }
    } catch (e: unknown | CustomAxiosErrorType) {
      let msg = '';
      const disError = onError(e as CustomAxiosErrorType);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // toast.success('Login successful!');
      console.log('Login values:', values);
      doLogin(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        ) : null}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm">{formik.errors.password}</div>
        ) : null}
      </div>

      {!loading ? (
        <Button className="border-RED" onClick={() => formik.handleSubmit()}>
          Log In
        </Button>
      ) : (
        // <div className=" items-center">
        <BeatLoader color="blue" />
        // </div>
      )}
    </form>
  );
};

export default LoginForm;
