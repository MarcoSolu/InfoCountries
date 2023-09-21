import React, { useContext, useState } from 'react';
import { RxAvatar } from 'react-icons/rx';
import useLogout from '@/hooks/useLogout';
import { AuthContext } from '@/context/AuthContext';
import Link from 'next/link';

const UserNavbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const { logout } = useLogout();

    const { userData } = useContext(AuthContext);

    console.log(userData);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="flex justify-between items-center p-4">
                <Link href='/'>
                    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
                        Info<span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Travel</span>
                    </h1>
                </Link>
                <div className="relative">
                    <RxAvatar
                        id="avatarButton"
                        type="button"
                        data-dropdown-toggle="userDropdown"
                        data-dropdown-placement="bottom-start"
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div
                            id="userDropdown"
                            className="z-10  absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 right-0"
                        >
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                <div>{userData?.name || 'your name'}</div>
                                <div className="font-medium truncate">{userData?.email || 'your email'}</div>
                            </div>
                            <ul 
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer">
                                <li onClick={() => logout()}>Logout</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>
  );
};

export default UserNavbar;