import React from 'react';
import Link from 'next/link';

const JoinDiv = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 rounded-lg p-8 shadow-md max-w-xl text-center text-white mb-40">
        <h1 className="text-6xl font-bold mb-4 text-blue-500">
          Welcome to InfoTravel!
        </h1>
        <p className="text-2xl text-gray-300 mb-6">
          Search for information about multiple countries.
        </p>
        <p className="text-xl text-gray-300 mb-6">
        You can search for information from a wide range of countries.
        </p>
        <Link href='/signup'>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 mt-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none">
            Join Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default JoinDiv;
