import React from "react";
import Image from "next/image";
import Link from "next/link";

function index() {
  return (
    <div className="grid grid-cols-1 grid-row-2 lg:grid-cols-2 lg:grid-rows-1">
      <div>
        <div className="overflow-hidden">
          <img
            src="/hero.jpg"
            className="opacity-70 lg:h-[93vh] h-[20vh] w-full object-cover"
          />
        </div>
      </div>
      <div className="lg:px-20 p-4 ">
        <h1 className="font-semibold text-2xl text-center">
         Welcome Back
        </h1>
        <form className="mb-6">
          <label
            htmlFor="email"
            className="block my-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            required
          />
          <label
            htmlFor="secret"
            className="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="secret"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required
          ></input>
          <button
            type="submit"
            className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <div>New to eKonsulta? Dont have an account?</div>
          <Link href="/signup">
            <span className="underline">Signup now!</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default index;
