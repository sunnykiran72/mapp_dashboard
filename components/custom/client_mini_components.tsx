"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { LoadingSpinner } from "./server_mini_components";


export const FormSaveBtn = ({form , isLoading , className} : {form : UseFormReturn<any> , isLoading : boolean ,className?:string }) => {
    const {formState ,getValues ,  } = form;
    console.log("dirty field "  ,  formState.isDirty );
    console.log("is valid form state " , formState.isValid );
    console.log("change fields "  , formState.dirtyFields );
    console.log("validating fields "  , formState.validatingFields );
    console.log("error fields "  , formState.errors  ,getValues() );
    const isDirty = formState.isDirty && Object.keys(formState.dirtyFields).length > 0 && formState.isValid;
    return  <div className='w-full flex items-center'>
                {
                isLoading ? <LoadingSpinner/> : 
                    <Button 
                        disabled={!isDirty}
                        type='submit' 
                        value="submit"
                        name="action"
                        variant={ isDirty ? "default" : "link" }  
                        className={cn(['max-w-sm w-full mx-auto ' , className])}
                    >
                        Save
                    </Button>
                }
        </div>}