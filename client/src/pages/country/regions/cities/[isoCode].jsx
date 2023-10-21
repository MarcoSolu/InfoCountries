import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TitleNavbar from '../../../../components/TitleNavbar';
import { AuthContext } from '../../../../context/AuthContext';
import Loading from '../../../../components/Loading';

const regionsCities = () => {

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const { code, isoCode } = router.query;

  const [cities, setCities] = useState([]);
  const [totalCities, setTotalCities] = useState([]);
  const [search, setSearch] = useState('');
  const [minPop, setMinPop] = useState('');
  const [maxPop, setMaxPop] = useState('');
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const citiesPerPage = 6;

  console.log(isoCode);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchCitiesData();
  };

  const handleNextPage = () => {
    if (currentPage < (totalCities.totalCount - (citiesPerPage - 1))) {
      setCurrentPage(prevState => prevState + citiesPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prevState => prevState - citiesPerPage);
    }
  };

  const fetchCitiesData = async () => {
    try {
      setIsLoadingCities(true);

      if (code) {
        const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions/${isoCode}/cities`, {
          params: {
            namePrefix: search,
            offset: currentPage,
            limit: citiesPerPage,
          },
          headers: {
            'X-RapidAPI-Key': '16cf8b464bmshde4292c1949a974p15873djsn45706d771381',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
          }
        });

        if (response.data.length === 0) {
          throw new Error('No Cities found, try later');
        } else {
          setCities(response.data.data);
          setTotalCities(response.data.metadata);
        }
      }
    } catch (err) {
      if (err.response.status === 429) {
        alert("Too many request, try later");
      }
      console.log(err.message);
    } finally {
      setIsLoadingCities(false);
    }
  };

  const elements = cities.map((city) => {
    return (
        <div key={city.id} className='bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg p-5'>
            <div className='flex flex-col'>
                <h1 className='text-2xl text-center mb-1'>
                    {city.name}
                </h1>
                <p> <strong>Population:</strong> {city.population} </p>
                <ul>
                  <li> <strong>Longitude:</strong> {city.longitude} </li>
                  <li> <strong>Latitude:</strong> {city.latitude} </li>
                </ul>
            </div>
        </div>
    )
});

  useEffect(() => {
    if (!authContext.userData || !authContext.userData.isLoggedIn) {
      router.push('/login');
    }
    fetchCitiesData();
  }, [code, isoCode, authContext.userData, router, currentPage]);

  console.log(cities);
  console.log(totalCities);

return (
  <div>
    <TitleNavbar />
    <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-xl mx-auto mt-8 text-white">

  <div className="relative">
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

  <div className="flex items-center">
    <h2 className="text-lg font-semibold mr-2">Cities found:</h2>
    <span className="text-blue-500">{totalCities.totalCount}</span>
  </div>

  <div className="flex justify-between mt-4">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input
        type="search"
        value={minPop}
        onChange={(e) => setMinPop(e.target.value)}
        id="minPop"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Min Population"
      />
    </div>

    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
    <input
        type="search"
        value={maxPop}
        onChange={(e) => setMaxPop(e.target.value)}
        id="maxPop"
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Max Population"
      />
    </div>
    </div>

    <div className="flex justify-center mt-4">
      <button
        type="button"
        onClick={handleSearch}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Search
      </button>
      </div>
    </div>
        <div className='flex justify-center items-center mt-16'>
          {isLoadingCities ? (<Loading />) : ( 
          <div>
            <div className='grid grid-cols-3 gap-2'>
              {elements}
          </div>
          <div className='mt-4 flex justify-center'>
              <button
                onClick={handlePreviousPage}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold mx-2 py-2 px-4 rounded'
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold mx-2 py-2 px-4 rounded'
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

export default regionsCities;