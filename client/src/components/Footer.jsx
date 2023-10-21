import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import linkedinLogo from '../../public/images/linkedIn-mark.png';
 

const Footer = () => {
  return ( 
    <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 absolute bottom-0 left-0 right-0 z-10">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023. All Rights Reserved.</span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link target='_blank' href='https://www.linkedin.com/in/marco-solustri-0836b7223/'>
              <Image src={linkedinLogo} alt="LinkedIn Logo" width={30} height={30} />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;