import React, { FC, useEffect, useRef, useState } from 'react'
import { Control, FieldValues } from 'react-hook-form'
import { FormItem ,FormLabel ,FormDescription ,FormControl ,FormMessage, FormField} from '../ui/form'
import ColorPicker  from 'react-best-gradient-color-picker'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { cn } from '@/lib/utils'

type InputProps<T extends FieldValues>  = {
    control : Control<T>
    label : string
    name:string
    subLabel? : string
    description?:string
    placeholder? : string
    required?:boolean
} 



const CustomColorPicker :FC<InputProps<any>> = ({
    control , required = true, label ,name ,
    description ,  subLabel ,  placeholder  }) => {

    const [showPopUp, setShowPopUp] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setShowPopUp(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }; 
})

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
            <Popover open={showPopUp} >
                <PopoverTrigger asChild>
                    <button 
                        className={cn(["flex items-center gap-3   w-full rounded-xl border border-input/20 bg-white   px-3 py-4 text-sm ring-offset-background focus-visible:outline-none  focus-within:ring-1 focus-within:ring-offset-[2.5px] focus-within:ring-ring/30  focus-within:ring-offset-white text-[13px]"])}
                        onClick={() => setShowPopUp(true) }
                        style={{
                           background: field.value
                        }}
                    />
                </PopoverTrigger>
                <PopoverContent ref={popoverRef} className='bg-white border border-input/20 rounded-2xl p-0 border-none' >
                    <FormControl>
                        <ColorPicker 
                           value={field.value} 
                           onChange={(v) => {
                                console.log(v);
                                field.onChange(v)
                           }} 
                           hidePresets
                           hideGradientType
                           hideGradientAngle
                           hideGradientControls
                           hideGradientStop
                        
                           
                        />
                    </FormControl>  
                </PopoverContent>
            </Popover>
            <FormMessage className='text-[13px] font-normal ml-2 '/>
            </FormItem>
             } }
        />
      )
}

export default CustomColorPicker