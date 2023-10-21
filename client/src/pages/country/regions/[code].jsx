import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TitleNavbar from '../../../components/TitleNavbar';
import Link from 'next/link';
import { AuthContext } from '../../../context/AuthContext';
import Loading from '../../../components/Loading';

const countryRegions = () => {

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const { code } = router.query;
  const [countryRegions, setCountryRegions] = useState([]);
  const [totalRegions, setTotalRegions] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const regionsPerPage = 6;

  const handleSearch = () => {
    setCurrentPage(0);
    fetchRegionsData();
  };

  const handleNextPage = () => {
    if (currentPage < (totalRegions.totalCount - (regionsPerPage - 1))) {
      setCurrentPage(prevState => prevState + regionsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevState => prevState - regionsPerPage);
    }
  };

  const fetchRegionsData = async () => {
    try {
      setIsLoadingDetails(true);

      if (code) {
        const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions`, {
          params: {
            namePrefix: search,
            offset: currentPage,
            limit: regionsPerPage,
          },
          headers: {
            'X-RapidAPI-Key': '16cf8b464bmshde4292c1949a974p15873djsn45706d771381',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          }
        });

        if (response.data.length === 0) {
          throw new Error('No Places found, try later');
        } else {
          setCountryRegions(response.data.data);
          setTotalRegions(response.data.metadata);
        }
      }
    } catch (err) {
      if (err.response.status === 429) {
        alert("Too many request, try later");
      }
      console.log(err.message);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const elements = countryRegions.map((region, index) => {
    return (
        <div key={index} className='bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg p-5'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-center mb-1'>
                    {region.name}
                </h1>
                {console.log(region.isoCode)}
                <Link href={`/country/regions/cities/${region.isoCode}?code=${code}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded mt-5' type='button'>
                    Cities
                  </button>
                </Link>

                <Link href={`/country/regions/details/${region.isoCode}?code=${code}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded mt-5' type='button'>
                    More Info
                  </button>
                </Link>
              
            </div>
        </div>
    )
});

useEffect(() => {
  if (!authContext.userData || !authContext.userData.isLoggedIn) {
    router.push('/login');
  }
  fetchRegionsData();
}, [code, authContext.userData, router, currentPage]);

  console.log(countryRegions);
  console.log(currentPage);

  return (
    <div>
        <TitleNavbar />
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-xl mx-auto mt-8 text-white">
        <div className="flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for places"
          />
        </div>
        <button
          onClick={handleSearch}
          className="bg-blue-500 hover-bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded"
        >
          Search
        </button>
      </div>

        <div className="flex items-center">
          <h2 className="text-lg font-semibold mr-2">Regions found:</h2>
          <span className="text-blue-500">{totalRegions.totalCount}</span>
        </div>
        </div>
        <div className='flex justify-center items-center mt-16'>
          {isLoadingDetails ? (<Loading />) : (
          <div>
            <div className='grid grid-cols-3 gap-4'>
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

export default countryRegions;