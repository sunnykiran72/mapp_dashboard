import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leading? : React.ReactNode,
  trailing? : React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type,  leading,trailing ,...props  }, ref) => {
    return (
      <div className="flex items-center gap-x-3 h-11 w-full rounded-xl border-[1.5px] border-input/20 bg-white px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-offset-[2.5px] focus-within:ring-input/20  focus-within:ring-offset-white  ">
            {
              leading && leading
            }
          <input
            type={type}
            className={cn(
              "w-full  text-black/90 font-medium placeholder:font-normal left-2 placeholder:text-black/50 placeholder:text-[13px] bg-transparent focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          {
              trailing && trailing
          }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
