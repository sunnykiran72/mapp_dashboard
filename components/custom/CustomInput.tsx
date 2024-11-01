"use client"

import React, { FC, InputHTMLAttributes } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type InputProps<T extends FieldValues>  = {
    control : Control<T>,
    label : string,
    subLabel? : string
    description?:string,
    placeholder? : string
    leading? : React.ReactNode,
    trailing? : React.ReactNode,
    required?:boolean
    showTextArea?:boolean
} & InputHTMLAttributes<HTMLInputElement>


const CustomInput:FC<InputProps<any>> = ({
    control , required = true, label ,
    description ,leading ,trailing , showTextArea,
    subLabel , name, placeholder , type,  ...props }) => {

        const isRequired = required && !props.disabled; 
  return (
    
    <FormField
    control={control}
    name={name as  string}
    render={({field})  => {
        return <FormItem className="w-full space-y-[5px]">
                <FormLabel className='ml-1 text-start text-black/70 font-semibold'>
                        {label}
                        <span className='text-black/40 text-xs ml-2'>{subLabel}</span>
                </FormLabel>
                {
                    description &&
                    <FormDescription className='flex items-center gap-x-1 ml-1 pb-1.5 text-[11px] text-black/40 font-medium'>
                        {description}
                    </FormDescription>
                }
        <FormControl>
            {
            showTextArea 
            ?   <Textarea 
                    {...field}
                    placeholder={placeholder}
                    required={isRequired}
                    />
               :
            <Input 
                {...field} 
                leading ={leading}
                placeholder={placeholder}
                trailing = {trailing}
                {...props}
                required={isRequired}
                type={type}
                className='no-spinner '
                onChange={(v) => {
                    if(type === "number" ){
                        const numericValue = parseFloat(v.target.value);
                        field.onChange(isNaN(numericValue) ? '' : numericValue);
                        return ;
                    }
                    field.onChange(v.target.value);
                }}
            />
            }
        </FormControl>
        <FormMessage className='text-[13px] font-normal ml-2 '/>
        </FormItem>
        } }
    />
  )
}

export default CustomInput