"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const [isLogin, setIsLogin] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      if (isLogin) {
        // LOGIN
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        });
      } else {
        // SIGNUP
        await fetch("/api/signup", {
          method: "POST",
          body: JSON.stringify(values),
        });

        // auto login after signup
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-neutral-900 w-full max-w-md p-6 rounded-3xl relative shadow-2xl">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          {/* Name (only signup) */}
          {!isLogin && (
            <input
              name="name"
              placeholder="Your Name"
              onChange={formik.handleChange}
              className="p-3 rounded-xl bg-neutral-800 outline-none"
            />
          )}

          <input
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            className="p-3 rounded-xl bg-neutral-800 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            className="p-3 rounded-xl bg-neutral-800 outline-none"
          />

          <button
            type="submit"
            className="bg-white text-black py-2 rounded-xl hover:scale-105 transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        {/* Toggle */}
        <p className="text-sm text-gray-400 mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-white underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

      </div>
    </div>
  );
}