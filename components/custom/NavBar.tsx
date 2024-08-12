"use client"
import { navbarList } from '@/constants/lists'
import { cn } from '@/lib/utils'
import { LogOut, UserRound } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


const NavBar = () => {

  const path = usePathname();

  return (
    <section className='hidden sm:flex flex-col p-3 pt-[50px]  border-r border-r-gray-200  md:w-[220px] h-screen'>
        <nav className='flex-1 space-y-3.5 text-2xl pt-10'>
            {
                navbarList.map((link) => {
                    const isActive = path === link.path || path.startsWith(`${link.path}/`)
                    return <Link  
                            href={link.path}
                            key={link.title} className={cn(['w-full h-[45px] items-center justify-center  md:justify-start  hover:bg-gray-200  text-black/80   whitespace-nowrap flex gap-x-3 rounded-full  px-2.5  md:pl-5 transition-all duration-200  ' , 
                            isActive && "bg-gradient-to-tr from-primary/30 to-primary/70 shadow-lg "])} >
                            <Image
                                src={link.icon}
                                alt={link.title}
                                width={20}
                                height={20}
                                className={cn([ "size-6 md:size-5" , isActive && "brightness-[3] invert-0"])}
                            />
                            <p className={cn(['whitespace-nowrap font-medium text-base hidden md:flex' , isActive && "font-bold"])}>{link.title}</p>
                    </Link>
                })
            }
        </nav>
    </section>
  )
}

export default NavBar