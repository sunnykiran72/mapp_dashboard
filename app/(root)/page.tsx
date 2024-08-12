import { GlanceCardType } from '@/types/types'
import React from 'react'
import GlanceCard from './components/GlanceCard'
import { formatAmount } from '@/lib/utils'
import { DataTable } from './components/userTable/UserDataTable'
import { Payment, userColumns } from './components/userTable/userColumns'

const page = () => {

  const glanceList:GlanceCardType[] = [
    { icon : "" , percentage : -10 , title : "New Customers" , value : formatAmount({ value : 120}) },
    { icon : "" , percentage : 12 , title : "Total Customers" , value : formatAmount({value : 121314}) },
    { icon : "" , percentage : 120 , title : "Active Customers" , value : formatAmount({ value : 12234}) },
    { icon : "" , percentage : 120 , title : "Total Purchase" , value : formatAmount({value : 150975 , fraction : 2 , showCurrency : true}) },
  ]

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqesfsf",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
    {
      id: "m5grsfs",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1rsdfasdf",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "der1234",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
  ];
  
  return (
    <section className='p-5 space-y-10 max-w-7xl mx-auto '>
      <ul className='flex flex-wrap gap-5 justify-center'>
        {
          glanceList.map( (v) => <GlanceCard key={v.title} {...v} /> )
        }
      </ul>

      <DataTable columns={userColumns} data={data} />
    </section>
  )
}

export default page