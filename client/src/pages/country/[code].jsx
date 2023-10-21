import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TitleNavbar from '../../components/TitleNavbar';
import Image from 'next/image';
import Link from 'next/link';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../components/Loading';

const countryDetails = () => {

  const authContext = useContext(AuthContext);

  const router = useRouter();

  const { code } = router.query;
  console.log(code);

  const [countryDetails, setCountryDetails] = useState({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  

  const fetchDetailsData = async () => {
    try {
      setIsLoadingDetails(true);

      if (code) {
        const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}`,
          {
            headers: {
              'X-RapidAPI-Key': '16cf8b464bmshde4292c1949a974p15873djsn45706d771381',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            },
          }
        );

        if (response.data.length === 0) {
          throw new Error('No Details found, try later');
        } else {
          setCountryDetails(response.data.data);
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 429) {
        alert("Too many request, try later");
        const retryAfter = err.response.headers['Retry-After'];
        setTimeout(fetchDetailsData, retryAfter * 5000);
      }
      console.log(err.message);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (!authContext.userData || !authContext.userData.isLoggedIn) {
      router.push('/login');
    }
    fetchDetailsData();
  }, [code, authContext.userData, router]);

  console.log(countryDetails);

  return (
    <div>
      <TitleNavbar />
      <div>
          {isLoadingDetails ? (
          <div className='flex justify-center items-center h-screen'> 
            <Loading />
          </div>
            ) : ( <div className='flex justify-center mt-2'>
            <div className="bg-gray-800 rounded-lg p-8 shadow-md max-w-xl text-center text-white mb-40">
              <Image 
                width={300} 
                height={300} 
                alt='country flag'
                src={countryDetails.flagImageUri} 
              />
              <h1 className="text-2xl font-bold mt-4">{countryDetails.name}</h1>
              <div className='flex flex-col m-2'>
                <p className='my-1'><strong>Capital:</strong> {countryDetails.capital}</p>
                <p className='my-1'><strong>Calling Code:</strong> {countryDetails.callingCode}</p>
                <p className='my-1'><strong>Number of Regions:</strong> {countryDetails.numRegions}</p>
              </div>
              <Link href={`/country/places/${code}`}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded' type='button'>
                  Places
                </button>
              </Link>
              <Link href={`/country/regions/${code}`}>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold mx-5 py-2 px-4 rounded' type='button'>
                  Regions
                </button>
              </Link>
            </div>
          </div>)}
      </div>
    </div>
  )
}

export default countryDetails;