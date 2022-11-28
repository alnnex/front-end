import React from "react";
import Image from "next/image";
import Link from "next/link";

function index() {
  return (
    <div className="grid grid-cols-1 grid-row-2 lg:grid-cols-2 lg:grid-rows-1">
      <div><Image object-fit="cover" width={1000} height={100} src="/hero.jpg"/></div>
      <div className="p-4">
        {" "}
        <form className="mb-6">
          <label
            for="email"
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
            for="secret"
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
            Submit
          </button>
        </form>

        <div className="text-center">New to eKonsulta? <Link href="/signup"><span className="underline">Signup now!</span></Link></div>
      </div>
    </div>
  );
}

export default index;
