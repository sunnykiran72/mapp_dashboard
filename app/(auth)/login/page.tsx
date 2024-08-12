"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CustomInput from "@/components/custom/CustomInput"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {useRouter} from "next/navigation";
import { AuthSchema, AuthType } from "@/types/schema"


const page = () => {

  const router = useRouter();

  const form = useForm<AuthType>({ 
    resolver : zodResolver(AuthSchema) ,
  });

  const handleSubmit = ({data} : {data :AuthType }) => {
    console.log({data});
    router.replace("/");
  }


  return (
        <Form {...form} >
          <form 
            onSubmit={ form.handleSubmit( (data) => handleSubmit({data}) ) }
            className="mx-auto max-w-md gap-6 w-full space-y-5 min-h-screen flex flex-col justify-center ">
              <h1 className="text-3xl font-bold ">Welcome Back !!!</h1>

             <div className="grid gap-y-5">

                <CustomInput
                    control={form.control}
                    label="Email"
                    name="email"
                    placeholder="Enter email id"
                />
                
                <CustomInput
                    control={form.control}
                    label="Password"
                    name="password"
                    placeholder="Enter password"
                />

                <Link
                    href="/forgot-password"
                    className="ml-auto text-sm underline"
                  >
                    Forgot your password?
                  </Link>
        
              <Button type="submit" className="w-full text-white ">
                Login
              </Button>
            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline text-primary font-semibold">
                Sign up
              </Link>
            </div>

          </form>
        </Form>
  )
}

export default page;