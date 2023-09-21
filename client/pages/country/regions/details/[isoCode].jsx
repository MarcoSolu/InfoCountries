import { useRouter } from 'next/router';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import TitleNavbar from '@/components/TitleNavbar';
import { AuthContext } from '@/context/AuthContext';
import Loading from '@/components/Loading';

const regionsDetails = () => {

  const authContext = useContext(AuthContext);

    const router = useRouter();

    const { code, isoCode } = router.query;
    const [detailsRegion, setDetailsRegion] = useState({});
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);

    console.log(isoCode);

    const fetchDetailsData = async () => {
      try {
        setIsLoadingDetails(true);
  
        if (code) {
          const response = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${code}/regions/${isoCode}`, {
            headers: {
              'X-RapidAPI-Key': '16cf8b464bmshde4292c1949a974p15873djsn45706d771381',
              'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            }
          });
  
          if (response.data.length === 0) {
            throw new Error('No Places found, try later');
          } else {
            setDetailsRegion(response.data.data);
          }
        }
      } catch (err) {
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
    }, [code, isoCode, authContext.userData, router]);

    console.log(detailsRegion);

  return (
    <div>
      <TitleNavbar />
      <div className='flex justify-center mt-16'>
      {isLoadingDetails ? (<Loading />) : ( <div className='bg-gray-800 text-white max-w-sm rounded overflow-hidden shadow-lg p-5'>
              <div className='flex flex-col'>
                  <h1 className='text-4xl text-center mb-1'>
                      {detailsRegion.name}
                  </h1>
                  <ul className='my-5'>
                    <li className='mb-5'> <strong>Capital:</strong> {detailsRegion.capital} </li>  
                    <li> <strong>Cities: </strong> {detailsRegion.numCities} </li>
                  </ul>            
              </div>
          </div>
        )}
        </div>
    </div>
  )
}

export default regionsDetails;