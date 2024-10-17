"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import MainLayout from "../../components/layouts/main";
import { useStore } from "../../store/store";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const { login } = useStore();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log("Signup submitted", values);
      // login using zustand sm store 
      login(values.email);
      router.push("/");
    },
  });

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
          >
            <h2 className="text-3xl font-bold text-center text-primary mb-6">
              Sign Up
            </h2>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary ${
                  formik.touched.email && formik.errors.email ? "border-red-500" : ""
                }`}
                id="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-xs italic">{formik.errors.email}</p>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary ${
                  formik.touched.password && formik.errors.password ? "border-red-500" : ""
                }`}
                id="password"
                type="password"
                placeholder="******************"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <p className="text-red-500 text-xs italic">{formik.errors.password}</p>
              ) : null}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className={`shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-primary ${
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? "border-red-500" : ""
                }`}
                id="confirmPassword"
                type="password"
                placeholder="******************"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <p className="text-red-500 text-xs italic">{formik.errors.confirmPassword}</p>
              ) : null}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-secondary  text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                type="submit"
              >
                Sign Up
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm  hover:text-secondary"
                href="/login"
              >
                Already have an account?
              </a>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
