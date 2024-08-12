"use client"

import CustomInput from '@/components/custom/CustomInput';
import { TitleText } from '@/components/custom/server_mini_components'
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { AccountSchema, AccountType } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react'
import { useForm } from 'react-hook-form';

const Page = () => {


  const form = useForm<AccountType>({ 
    resolver : zodResolver(AccountSchema) ,
  });

  return (
    <Form {...form}>
      <form className='space-y-8 max-w-3xl mx-auto px-6 '>
          <TitleText
            title='Account Profile'
          />

          <div className='space-y-5'>

            <div className='rounded-full w-36 h-36 flex items-center justify-center  bg-white  mx-auto shadow-[-10px_-10px_30px_4px_rgba(45,60,255,0.1),_10px_10px_30px_4px_rgba(45,60,255,0.1)] my-10' >
                <Image
                  src="/icon/user.svg"
                  alt='profile icon'
                  width={40}
                  height={40}
                  className='opacity-50 object-cover'
                />
            </div>
            
            <div className='gap-x-4 gap-y-5 flex flex-col md:flex-row'>
                <CustomInput
                  control={form.control}
                  label="First Name"
                  name="firstName"
                  placeholder="Enter first name"
              />
                <CustomInput
                  control={form.control}
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter last name"
              />
            </div>
            <div className='gap-x-4 gap-y-5 flex flex-col md:flex-row'>
                <CustomInput
                  control={form.control}
                  label="Mobile Number"
                  name="mobileNo"
                  placeholder="Enter mobile number"
              />
              <CustomInput
                  control={form.control}
                  label="Email"
                  name="email"
                  placeholder="Enter email id"
              />
            </div>
   
          </div>

          <Button type="submit" className="w-full text-white">
                Save
          </Button>
      </form>
    </Form>
  )
}

export default Page