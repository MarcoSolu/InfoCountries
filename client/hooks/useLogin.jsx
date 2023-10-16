import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";

export const useLogin = () => {

    const router = useRouter();

    const authContext = useContext(AuthContext);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    

    const login =  async (email, password) => {
        setIsLoading(true);
        setIsError(false);

        try {
            const response = await axios.post(
                'https://infocountries.onrender.com/login', { email, password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    withCredentials: true,
                }
            );      
            console.log("Login successful:", response.data);

            authContext.dispatch({
                type: "LOGIN",
                payload: response.data, 
            });
            
            console.log(authContext.isAuthenticated);

            const jwtToken = response.data.token;

            const favoriteCountriesResponse = await axios.get(
                'https://infocountries.onrender.com/get-favorites',
                {
                  headers: {
                    Authorization: `Bearer ${jwtToken}`,
                  },
                }
              );
        
              const favoriteCountries = favoriteCountriesResponse.data.favoriteCountries;
        
              
              authContext.dispatch({
                type: "SET_FAVORITE_COUNTRIES",
                payload: favoriteCountries,
              });

            router.push('/user/home');
            
        } catch (error) {
        console.error("Login error:", error);
        setIsError(true);
        } finally {
        setIsLoading(false);
        }
    }

    return { login, isLoading, isError };
}