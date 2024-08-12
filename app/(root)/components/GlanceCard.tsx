import { cn, formatAmount } from '@/lib/utils'
import { GlanceCardType } from '@/types/types'
import Image from 'next/image'
import React, { FC } from 'react'



const GlanceCard:FC<GlanceCardType> = ({title , icon ,value , percentage}) => {
  return (
    <li className='w-[280px] p-3.5 rounded-2xl border-[1px] border-slate-100 grid space-y-4 shadow-[rgba(20,_65,_210,_0.1)_0px_10px_20px] ' >
        <div className='flex space-x-3 justify-between'>
            <div className='grid space-y-1'>
                <p className='text-xs text-gray-600 font-semibold'>{title}</p>
                <span className='text-2xl font-bold'>{value}</span>
            </div>
            {/* <Image
              src={icon}
              alt={title}
              width={50}
              height={50}
              className='rounded-full p-1'
            /> */}
        </div>
        <span className={cn([ 'font-semibold flex items-center  gap-x-2',  percentage > 0 ? 'text-green-600' : 'text-red-500'  ])} >
            {percentage}%
                <span className='text-xs font-medium text-black/70'>Since last month</span>
            </span>
    </li>
  )
}

export default GlanceCard