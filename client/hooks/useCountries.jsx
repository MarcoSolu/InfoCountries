import { useEffect, useState } from 'react';
import axios from 'axios';

export const useCountries = () => {

    const [countries, setCountries] = useState([]);
    const [totalCountries, setTotalCountries] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const countriesPerPage = 10;

    const fetchCountryData = async () => {
        try {
            setIsLoading(true)

            const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/countries', {
                params: {
                    namePrefix: search,
                    offset: currentPage,
                    limit: countriesPerPage,
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
                console.log(response.data);
                setCountries(response.data.data);
                setTotalCountries(response.data.metadata);
            }
        } catch(err) {
            if (err.response.status === 429) {
                alert("Too many request, try later");
            }
            console.log(err.message);
        }
        finally {
            setIsLoading(false);
        }
    }

  return {countries, search, setSearch, isLoading, currentPage, setCurrentPage, totalCountries, countriesPerPage, fetchCountryData}
}