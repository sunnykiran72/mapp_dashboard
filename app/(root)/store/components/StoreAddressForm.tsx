"use client"

import CustomInput from '@/components/custom/CustomInput';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {  StoreAddressSchema, StoreAddressType } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';

const StoreAddressForm = () => {

   const form = useForm<StoreAddressType>({
    resolver : zodResolver(StoreAddressSchema) ,
   }); 
   
  return (
    <Form {...form}>
        <form className="mx-auto  w-full space-y-5 justify-center py-5  px-5 ">
          
            <CustomInput
                control={form.control}
                label='Address 1'
                placeholder='Enter address 1'
                name='address1'
            />
            <CustomInput
                control={form.control}
                label='Address 2'
                placeholder='Enter address 2'
                name='address2'
            />
            
            <div className='flex gap-x-3 gap-y-5 flex-col sm:flex-row'>
                <CustomInput
                    control={form.control}
                    label='Zipcode'
                    placeholder='Enter zipcode'
                    name='zipcode'
                />
                <CustomInput
                    control={form.control}
                    label='city'
                    placeholder='Enter city'
                    name='city'
                />
            </div>
            <div className='flex gap-x-3 gap-y-5 flex-col sm:flex-row'>
                <CustomInput
                    control={form.control}
                    label='State'
                    placeholder='Enter state'
                    name='state'
                />
                <CustomInput
                    control={form.control}
                    label='Country'
                    placeholder='Enter country'
                    name='country'
                />
            </div>

    
        <Button type="submit" className="w-full text-white ">
            Save
        </Button>

        </form>
    </Form>
  )
}

export default StoreAddressForm