"use client"

import { TitleText } from '@/components/custom/server_mini_components'
import { RegisterSchema, RegisterType } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from "@/components/ui/form"
import CustomInput from '@/components/custom/CustomInput'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const page = () => {

   const form = useForm<RegisterType>({
    resolver : zodResolver(RegisterSchema) ,
   }); 

   const router = useRouter();

   const handleSubmit = () => {
        router.replace("/");
   }

  return (
        <Form {...form}>
            <form className="mx-auto max-w-md  w-full space-y-7 min-h-screen flex flex-col justify-center">
              
              <TitleText
                title='Register'
                description={<span>Already have an account? <Link href="/login" className='text-primary font-bold' >Login</Link></span> }
              />

              <article className='grid gap-y-5'>
                  <CustomInput
                    control={form.control}
                    label='First Name'
                    placeholder='Enter first name'
                    name='firstName'
                  />
                  <CustomInput
                    control={form.control}
                    label='Last Name'
                    placeholder='Enter last name'
                    name='lastName'
                  />
                  <CustomInput
                    control={form.control}
                    label='Mobile Number'
                    placeholder='Enter Mobile No'
                    name='mobileNo'
                  />
                  <CustomInput
                    control={form.control}
                    label='Email Id'
                    placeholder='Enter email id'
                    name='email'
                  />
                  <CustomInput
                    control={form.control}
                    label='Password'
                    placeholder='Enter password'
                    name='password'
                  />
            
              </article>

              <Button type="submit" className="w-full text-white">
                Register
              </Button>
            </form>
        </Form>
   )
}

export default page