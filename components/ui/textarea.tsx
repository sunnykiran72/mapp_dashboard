import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full font-medium rounded-xl border border-input/20 bg-gradient-to-b from-white/80 to-white  px-3 py-2 text-sm ring-offset-background placeholder:font-normal placeholder:text-black/50 placeholder:text-[13px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black/10 focus-visible:ring-offset-[2.5px] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
