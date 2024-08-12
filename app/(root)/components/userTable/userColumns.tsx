"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, formatAmount } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table"
import {ArrowUp , ArrowDown } from "lucide-react";

type PaymentStatus =  "pending" | "processing" | "success" | "failed";

export type Payment = {
  id: string
  amount: number
  status: PaymentStatus
  email: string
}

export const userColumns: ColumnDef<Payment>[] = [
  {
    id : 'select',
    header : ({table }) => {
      return <Checkbox 
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={ (val) => {
            console.log(val);
           table.toggleAllPageRowsSelected(val as boolean )
          } } 
          >
      </Checkbox>
    },
    cell : ({row}) => {
       return <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(val as boolean) }
       />
    },
  },
  { 
    accessorKey: "id", 
    header: "Reference No", 
    size : 500,
    minSize  :  1000, 
    cell : ({row}) => {
      const info = row.original.id;
      return <span className="">{info}</span>
    }
  },
  { 
      accessorKey: "amount",  
      header: ({ column}) => {
          return <button 
              onClick={() => column.toggleSorting()} 
              className="flex items-center gap-x-1 w-[80px]"
              >
              Amount
                { column.getIsSorted() == "asc" && <ArrowUp className="w-3.5 h-3.5"/>  }
                { column.getIsSorted() == "desc" && <ArrowDown className="w-3.5 h-3.5"/> }
          </button>
      } ,
      cell : ({getValue , }) => { 
        const value = getValue() as number;
        return <span className="text-center font-semibold text-green-600 ">{formatAmount({value , fraction : 2 , showCurrency: true })}</span>
      }
  },
  { 
    accessorKey: "email",
    header:() => <p className="text-center" >Email</p> ,
    cell:({row}) => {
        return <p className="text-[13px] text-center ">
          {row.original.email}
        </p>
    }

  },
  { 
    accessorKey: "status", 
    header: () => <span className="pl-5 text-center w-fit">Status</span>,
    cell : ({getValue}) =>{
      const value = getValue() as PaymentStatus;
      return <div 
        className={cn([ 
            "text-xs font-semibold  p-2 rounded-lg shadow-lg text-white w-[100px] text-center",
            value == "processing" && "bg-blue-500" ,
            value == "success" && "bg-green-700" ,
            value == "pending" && "text-red-400" ,
            value == "failed" && "bg-red-700"   
        ])}
      >
        <span className="w-full">
          {value.toUpperCase()}
        </span>
    </div>
    }
  }
];