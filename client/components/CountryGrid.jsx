import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useCountries } from '@/hooks/useCountries';
import Link from 'next/link';
import Loading from './Loading';
import { AuthContext } from '@/context/AuthContext';

const CountryGrid = () => {
  const { countries, search, setSearch, currentPage, setCurrentPage, totalCountries, countriesPerPage, fetchCountryData, isLoading } = useCountries();

  const { userData, dispatch } = useContext(AuthContext);

  console.log(countries);
  console.log(userData);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchCountryData();
  };

  const handleNextPage = () => {
    if (currentPage < totalCountries.totalCount - countriesPerPage) {
      setCurrentPage((prevState) => prevState + countriesPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevState) => prevState - countriesPerPage);
    }
  };

  const toggleFavorite = (code) => {
    if (userData.favoriteCountries.includes(code)) {
      removeFavorite(code);
    } else {
      addFavorite(code);
    }
  };
  
  const addFavorite = async (countryCode) => {
    try {
      const userEmail = userData.email; 
  
      const response = await axios.post('https://infocountries.onrender.com/add-favorite', { userEmail, countryCode }, 
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      }
      });
  
      if (response.status === 200) {
        dispatch({
          type: 'ADD_FAVORITE_COUNTRY',
          payload: { countryCode },
        });
      } else {
        console.log("Failed to add country to favorites");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const removeFavorite = async (countryCode) => {
    try {
      const userEmail = userData.email;
  
      const response = await axios.post('https://infocountries.onrender.com/remove-favorite', { userEmail, countryCode },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
      }
      });
  
      if (response.status === 200) {
        dispatch({
          type: 'REMOVE_FAVORITE_COUNTRY',
          payload: { countryCode },
        });
      } else {
        console.log("Failed to remove country from favorites");
      }
    } catch (error) {
      console.error(error);
    }
  };  

  useEffect(() => {
    fetchCountryData();
  }, [currentPage]);

  const elements = countries.map((country) => (
    <div key={country.code} className='bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg p-5'>
      <div className='flex justify-between items-center space-x-4'>
        <h1 className='text-xl p-2 font-bold'>
          {country.name}
        </h1>
        <Link href={`/country/${country.code}`}>
          <button className='bg-blue-500 hover:bg-blue-700 p-2 text-white font-bold border border-blue-700 rounded'>
            More Info
          </button>
        </Link>
        <button
          className={`p-2 text-xl ${userData.favoriteCountries.includes(country.code) ? 'text-yellow-500' : 'text-gray-500'}`}
          onClick={() => toggleFavorite(country.code)}
        >
          {userData.favoriteCountries.includes(country.code) ? '★' : '☆'}
        </button>
      </div>
    </div>
  ));  

  return (
    <div>
        <div className="flex flex-col items-center justify-center">
  <div className="relative mt-8 w-1/2">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        ></path>
      </svg>
    </div>
    <input
      type="search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      id="default-search"
      className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Search for countries"
      required
    />
    <button
      type="button"
      onClick={handleSearch}
      className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Search
    </button>
  </div>

  <div className="flex items-center mt-4 bg-gray-700 p-2 rounded-lg">
    <h2 className="text-lg font-semibold mr-2">Countries found:</h2>
    <span className="text-blue-500">{totalCountries.totalCount}</span>
  </div>
</div>

    <div className='flex justify-center items-center mt-16'>
            {isLoading ? (<Loading /> ) : (
            <div>
                <div className='grid grid-cols-2 gap-4'>
                    {elements}
                </div>
                <div className='mt-4 flex justify-center'>
            <button
              onClick={handlePreviousPage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded'
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded'
            >
              Next
            </button>
          </div>
        </div>
            )}
        </div>
    </div>
  )
}

export default CountryGrid;