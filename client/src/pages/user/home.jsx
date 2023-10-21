import { useEffect, useContext } from 'react';
import UserNavbar from '../../components/UserNavbar';
import CountryGrid from '../../components/CountryGrid';
import { useRouter } from 'next/router';
import { AuthContext } from '../../context/AuthContext';

const UserHome = () => {

  const router = useRouter();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext.userData || !authContext.userData.isLoggedIn) {
      router.push('/login');
    }
  }, [authContext.userData, router]);

  return (
    <>
        <UserNavbar />
        <CountryGrid />
    </>
  )
}

export default UserHome;