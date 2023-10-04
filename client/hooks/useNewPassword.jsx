// useNewPassword.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/AuthContext';

export const useNewPassword = () => {
  const authContext = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const newPassword = async (email, password) => {
    setIsLoading(true);
    setIsError(false);
    setError('');

    try {
      const response = await axios.post(
        'https://infocountries.onrender.com/change-password',
        { email, newPassword: password }
      );

      authContext.dispatch({
        type: 'CHANGE_PASSWORD',
        payload: {
          success: true,
          message: 'Password changed successfully',
        },
      });

      // Redirect to a success page or any appropriate route
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage =
        error.response?.data?.message || 'Password change failed. Please try again.';
      setError(errorMessage);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { newPassword, isLoading, isError, error };
};

