"use client"

import CustomInput from '@/components/custom/CustomInput';
import { TitleText } from '@/components/custom/server_mini_components';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { BusinessDetailSchema, BusinessDetailsType } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const BusinessDetailsForm = () => {

   const form = useForm<BusinessDetailsType>({
    resolver : zodResolver(BusinessDetailSchema) ,
   }); 
   
  return (
    <Form {...form}>
        <form className="mx-auto  w-full space-y-5 justify-center py-5  px-5 ">
          
            <CustomInput
                control={form.control}
                label='Business Name'
                placeholder='Enter Business Name'
                name='name'
            />
            <CustomInput
                control={form.control}
                label='Store Description'
                placeholder='Enter store description'
                name='description'
                showTextArea
            />
            
            <div className='flex gap-x-3 gap-y-5 flex-col md:flex-row'>
                <CustomInput
                    control={form.control}
                    label='Contact Email Id'
                    placeholder='Enter email id'
                    name='email'
                />
                <CustomInput
                    control={form.control}
                    label='Store Phone Number'
                    placeholder='Enter phoneNo'
                    name='phoneNo'
                />
            </div>

    
        <Button type="submit" className="w-full text-white ">
            Save
        </Button>

        </form>
    </Form>
  )
}

export default BusinessDetailsForm