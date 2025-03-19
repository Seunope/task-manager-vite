import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';
import { SIGN_UP_USER } from '../../config/api/http';
import { SignUpDTO } from '../../config/utils/types';
import { CustomAxiosErrorType, onError, onSuccess } from '../../config/api/http-mthd';
import { useState } from 'react';
import { addUserData } from '../../config/redux/reducers/userSlice';
import { AUTH_CONSTANTS } from '../../constants/auth';
import { useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
}

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const doSignUp = async (input: SignUpDTO) => {
    try {
      setLoading(true);
      const response = await SIGN_UP_USER(input);
      setLoading(false);
      const res = onSuccess(response);
      console.log('resSSSSS', res);
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
      console.log('DDDDd', disError);
      msg = disError as string;
      toast.error(msg);
      setLoading(false);
    }
  };
  const formik = useFormik<SignupFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      // console.log('Signup values:', values);
      doSignUp(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm">{formik.errors.name}</div>
        ) : null}
      </div>

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
        <Button onClick={() => formik.handleSubmit()}>Sign Up</Button>
      ) : (
        <BeatLoader color="blue" />
      )}
    </form>
  );
};

export default SignupForm;
