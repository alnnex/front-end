import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Index() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const spinner = (<div className="relative">
    <svg
      aria-hidden="true"
      className="absolute left-56 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg> Signing you up...</div>
  );

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
            className="relative mt-6 bg-gradient-to-r from-primary  to-tertiary via-secondary border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {uploadingImg ?  "Signing you up...": "Signup"}
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
