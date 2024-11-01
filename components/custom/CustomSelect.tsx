

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import { FC } from "react"
import { Control, FieldValues } from "react-hook-form"

export type DropDownItemType = {
  value: any,
  label: string
}

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"

type CustomSelectProps<T extends FieldValues> = {
  control : Control<T>,
  name :string,
  label?: string,
  placeholder: string,
  items: DropDownItemType[],
  onChange?: (v:string) => void 
}

export const CustomSelect: FC<CustomSelectProps<any>> = ({name, label , control, placeholder, items ,onChange }) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return <FormItem className="w-full space-y-[5px]">
          {
            label &&   <FormLabel className='ml-1 text-start'>{label}</FormLabel>
          }
              <Select
                required
                disabled={field.disabled}
                defaultValue={field.value}
                onValueChange={onChange ?? field.onChange }
              >
              <SelectTrigger className="w-full bg-white border border-input/20">
               
                {
                   field.value ? items.find((v) => v.value.toString() === field.value.toString())?.label  : placeholder
                }
              </SelectTrigger>
            <FormControl>
                <SelectContent  className="border-none rounded-2xl shadow-lg  bg-white py-2 px-2 " >
                  <SelectGroup>
                    {
                      items.map((item) =>
                        <SelectItem key={item.value} value={item.value}>{item.label} </SelectItem>
                      )
                    }
                  </SelectGroup>
                </SelectContent>
            </FormControl>
            </Select>
          <FormMessage/>
        </FormItem>
      }}

    />
  )
}
