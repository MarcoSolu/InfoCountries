import React from 'react';
import Image from 'next/image';
import wallpaperPic from '../public/images/mainWallpaper.jpg';
import { useRouter } from 'next/router';

import Footer from './Footer';

const Layout = ({ children }) => {
  const router = useRouter();

  const routesWithoutFooter = ['/login', '/signup'];
  const shouldShowFooter = !routesWithoutFooter.includes(router.pathname);
    
  return (
    <div>   
        <Image 
            src={wallpaperPic}
            alt='Background Image'
            fill
            objectFit='cover'
            quality={100}
            className="absolute top-0 left-0 w-full h-full z-0"
            />
        <main className='relative z-10'>
            {children}
        </main> 
        {shouldShowFooter && <Footer />}
    </div>
  )
}

export default Layout;