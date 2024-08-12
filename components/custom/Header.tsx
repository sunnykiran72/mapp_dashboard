"use client";
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';


const Header = () => {

  return (
    <div className={cn([ 'fixed border-b border-gray-300 bg-white/75 backdrop-blur-md h-16 flex items-center px-5 w-full' ])} >
         <Link 
            href="/"
            className='w-full gap-x-2 flex items-center font-bold text-3xl font-ibm-plex-serif'>
                {/* <Image
                    src="/icons/logo.svg"
                    alt="logo"
                    width={50}
                    height={32}
                    className='size-12 sm:size-16'
                />  */}
                <h2>Mapp</h2>
            </Link>
        
            <div className='h-10 w-10 rounded-full bg-zinc-300 flex items-center justify-center cursor-pointer ' >
                <span className='font-semibold text-sm'>SK</span>
            </div>
    </div>
  )
}

export default Header