import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCountries = () => {

    const [countries, setCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchCountryData = async () => {
        try {
            setIsLoading(true)

            const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries', {
                params: {
                    limit: '10',
                    namePrefix: search,
                  },
                headers: {
                    'X-RapidAPI-Key': '16cf8b464bmshde4292c1949a974p15873djsn45706d771381',
                    'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                  }
                });
            if (response.data.length === 0) {
                throw new Error('No Countries founded, try later');
            }
            else {
                console.log(response.data.data);
                setCountries(response.data.data);
            }
        } catch(err) {
            console.log(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

  return {countries, search, setSearch, isLoading, fetchCountryData}
}