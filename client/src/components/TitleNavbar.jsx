import { useContext } from 'react';
import Link from 'next/link';
import { AuthContext } from '../context/AuthContext';

const TitleNavbar = () => {
  const authContext = useContext(AuthContext);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex justify-between items-center p-4">
        <Link href='/'>
          <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Info<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Countries</span>
          </h1>
        </Link>
        {authContext.userData?.isLoggedIn ? (
          <Link 
          href="/user/home"
          className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
             Dashboard
          </Link>
        ) : null}
      </div>
    </nav>
  )
}

export default TitleNavbar;