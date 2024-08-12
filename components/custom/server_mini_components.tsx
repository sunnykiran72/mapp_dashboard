import { Loader2 } from "lucide-react"
import { ReactNode } from "react"




export const TitleText = ({title , description} : {title : string , description? : ReactNode}) => {
    return <div className="grid gap-y-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        {
            description &&  <span className="text-sm font-medium text-slate-500">{description}</span>
        }
    </div>
} 


export const LoadingSpinner = () => {
    return  <div className="w-full flex items-center justify-center">
              <Loader2 className="animate-spin" />
          </div>
  }