import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const useSignup = () => {
  
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signup = async (name, email, password) => {
    setIsLoading(true);
    setIsError(false);

    try {
      
      const response = await axios.post(
        'https://infocountries.onrender.com/register',
        { name, email, password },
        {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            withCredentials: true,
        }
      );
      
      console.log("Signup successful:", response.data);
      router.push("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, isError };
};
