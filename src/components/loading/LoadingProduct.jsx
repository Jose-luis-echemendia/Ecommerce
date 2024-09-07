import React from "react";

export const LoadingProduct = () => {
  return (
    <>
      <div className="bg-white p-2 sm:p-4 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
        <div className="flex flex-col w-1/2">
          <div className="h-52 sm:h-96 sm:w-full rounded-xl bg-gray-200 animate-pulse"></div>
          <div className="mt-10 flex gap-3">
            <div className="bg-gray-200 w-20 h-20 animate-pulse rounded-lg mx-auto"></div>
            <div className="bg-gray-200 w-20 h-20 animate-pulse rounded-lg mx-auto"></div>
            <div className="bg-gray-200 w-20 h-20 animate-pulse rounded-lg mx-auto"></div>
            <div className="bg-gray-200 w-20 h-20 animate-pulse rounded-lg mx-auto"></div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="bg-gray-200 w-full animate-pulse h-20 rounded-2xl"></div>
            <div className="bg-gray-200 w-20 h-10 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-20 h-10 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full animate-pulse h-2 rounded-2xl"></div>
            <div className="bg-gray-200 w-full h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-full h-8 animate-pulse rounded-full"></div>
            <div className="bg-gray-200 w-full h-8 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
