import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Index() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      return alert("Max file size is 1mb!");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "thesis");
    try {
      setUploadingImg(true);
      let res = await fetch(
        "https://api.cloudinary.com/v1_1/alnnex/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const urlData = await res.json();
      setUploadingImg(false);
      return urlData.url;
    } catch (error) {
      setUploadingImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    if (!image) return alert("Please upload your profile picture!");
    const url = await uploadImage(image);
    console.log(url);
  }

  return (
    <div className="grid grid-cols-1 grid-row-2 lg:grid-cols-2 lg:grid-rows-1">
      <div className="lg:px-20 p-4 order-last lg:order-first">
        <h1 className="font-semibold text-2xl text-center">
          Create an account
        </h1>
        <form className="mb-6 " onSubmit={(e) => handleSignup(e)}>
          <div className="w-24  mx-auto">
            <label htmlFor="profilePic" className="cursor-pointer relative">
              <img
                src={imagePreview || "/defaultPP.png"}
                className="aspect-square rounded-full object-cover border-solid border-black border-2"
              />
              <i className="absolute -bottom-1 right-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-green-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                    clipRule="evenodd"
                  />
                </svg>
              </i>
            </label>
            <input
              type="file"
              hidden
              id="profilePic"
              accept="image/png, image/jpeg"
              onChange={(e) => validateImg(e)}
            ></input>{" "}
          </div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="block my-2 text-sm font-medium text-gray-900 dark:text-white "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="first name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            ></input>
          </div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
          <small>We will never share you information with anyone else.</small>
          <label
            htmlFor="secret"
            className="block my-2  text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="secret"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          ></input>

          <button
            type="submit"
            className="mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            Signup
          </button>
        </form>
        <div className="text-center">
          <p>
            Already have an account?
            <Link href="/">
              {" "}
              <span className="underline">Login now!</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="overflow-hidden">
        <img
          src="/hero.jpg"
          className="opacity-70 lg:h-[93vh] h-[20vh] w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Index;
