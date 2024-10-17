"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import MainLayout from '../../components/layouts/main';
import { useStore } from '../../store/store';
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const { login } = useStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log('Login submitted', values);
      login(values.email);
      router.push('/');
    },
  });

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">Login</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary ${
                  formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
                id="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary ${
                  formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                }`}
                id="password"
                type="password"
                placeholder="******************"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-secondary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
              >
                Sign In
              </button>
              <div className='flex flex-col gap-2 justify-end'>
                <a className="inline-block align-baseline font-bold text-xs text-primary" href="#">
                  Forgot Password?
                </a>
                <a
                  className="inline-block align-baseline font-bold text-xs hover:text-primary"
                  href="/signup"
                >
                  Don't have an account?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
