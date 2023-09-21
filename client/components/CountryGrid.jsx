import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCountries } from '@/hooks/useCountries';
import { FiSearch } from 'react-icons/fi';
import Link from 'next/link';
import Loading from './Loading';

const CountryGrid = () => {

    const { countries, search, setSearch, fetchCountryData, isLoading } = useCountries();
    
    const handleSearch = () => {
        fetchCountryData();
      };

    useEffect(() => {
        fetchCountryData();
    }, []);

    const elements = countries.map((country) => {
        return (
            <>
                <div key={country.code} className='bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg p-5'>
                    <div className='flex justify-between'>
                        <h1 className='p-2'>
                            {country.name}
                        </h1>
                        <Link href={`/country/${country.code}`}>
                            <button className='bg-blue-500 hover:bg-blue-700 p-2 text-white font-bold border border-blue-700 rounded'>
                                More Info
                            </button>
                        </Link>
                    </div>
                </div>
            </>
        )
    });

  return (
    <div>
        <div className='flex justify-center'>
            <div class="relative mt-8 w-1/2">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input 
            type="search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="default-search" 
            class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Search for countries" 
            required 
            />
            <button 
            type="button"
            onClick={handleSearch}
            class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Search
            </button>
            </div>
        </div>
    <div className='flex justify-center items-center mt-16'>
            {isLoading ? (<Loading /> ) : ( <div className='grid grid-cols-2 gap-4'>
                {elements}
            </div>)}
        </div>
    </div>
  )
}

export default CountryGrid;