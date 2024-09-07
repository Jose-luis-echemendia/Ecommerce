import React from "react";

export const CardPopus = () => {
  return (
    <>
      <div class="flex h-screen flex-col items-center justify-center space-y-6 bg-gray-100 px-4 sm:flex-row sm:space-x-6 sm:space-y-0">
        <div class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto mt-8 h-16 w-16 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">
            Success
          </h1>
          <p class="my-4 text-center text-sm text-gray-500">
            Woah, successfully completed 3/5 Tasks
          </p>
          <div class="space-x-4 bg-gray-100 py-4 text-center">
            <button class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
              Cancel
            </button>
            <button class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">
              Dashboard
            </button>
          </div>
        </div>
        <div class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto mt-8 h-16 w-16 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
          <h1 class="mt-2 text-center text-2xl font-bold text-gray-500">
            Cancel
          </h1>
          <p class="my-4 text-center text-sm text-gray-500">
            Just a small miss, 2/5 Tasks
          </p>
          <div class="space-x-4 bg-gray-100 py-4 text-center">
            <button class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400">
              Cancel
            </button>
            <button class="inline-block rounded-md bg-green-500 px-6 py-2 font-semibold text-green-100 shadow-md duration-75 hover:bg-green-400">
              Try Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
