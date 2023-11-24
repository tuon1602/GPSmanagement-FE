"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

const SignupSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Required"),
});

const LoginPage = () => {
  const router = useRouter();
  return (
    <div className="w-[500px] m-auto my-20 border border-gray-400 rounded shadow-xl">
      <ToastContainer />
      <div className="py-20">
        <div className="flex justify-center mb-5 items-center text-xl font-bold">
          Admin Login to GPS Service
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            // same shape as initial values
            console.log(values);
            const username = values.username;
            const password = values.password;
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                  }),
                }
              );
              if (!res.ok) {
                toast.error("Your username or password is incorrect");
              } else {
                const data = await res.json();
                  localStorage.setItem("token", data.token);
                  router.push("/dashboard");

              }
            } catch (error) {
              toast.error("Your username or password is incorrect");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col px-20 gap-4">
              <Field
                name="username"
                type="text"
                placeholder="Username"
                className="border p-3"
              />
              {errors.username && touched.username ? (
                <div className="text-red-500 text-sm">{errors.username}</div>
              ) : null}
              <Field
                name="password"
                type="password"
                placeholder="Pasword"
                className="border p-3"
              />
              {errors.password && touched.password ? (
                <div className="text-red-500  text-sm">{errors.password}</div>
              ) : null}
              <button
                type="submit"
                className="border-none py-2 rounded hover:opacity-75 bg-black text-white"
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;
