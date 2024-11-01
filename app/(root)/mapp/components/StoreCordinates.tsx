import { FC, useEffect } from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {  UseFormReturn } from 'react-hook-form'
import { useMapStore } from '@/stores/useMapStore'
import { Button } from '@/components/ui/button'
import { StoreMapType } from '@/types/schema'


export type StoreCordinatesProps = {
    form : UseFormReturn<StoreMapType ,any>
    label : string
} 
const StoreCordinates :FC<StoreCordinatesProps> = ({ form , label    }) => {
    const {hoverPointer}  =  useMapStore() ;

    useEffect(() => {
        if(!hoverPointer){
            return;
        }
        form.setValue( "cordinates", [hoverPointer!.x , hoverPointer!.y] );   
    }, [hoverPointer])
    
  return (
    <FormField
    control={form.control}
    name= "cordinates"
    render={({field})  => {
        return <FormItem className="w-full space-y-2">
                <FormLabel className='ml-1 text-start'>{label}</FormLabel>
                <div>{}</div>
                <FormControl >
                {
                    ( !hoverPointer  || !field.value.length )
                    ?  <Button className=''>Get Cordinates</Button>
                    :  <span className='text-sm font-medium'>{field.value[0]} , {field.value[1]}</span>
                }

            </FormControl>
        <FormMessage/>
        </FormItem>
        } }
    />
  )
}

export default StoreCordinates