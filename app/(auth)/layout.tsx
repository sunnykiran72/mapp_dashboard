import Image from "next/image";
import { ReactNode } from "react";


const RootLayout = ({children} : Readonly<{children:ReactNode}>)=> {
    return (
        <main className="bg-zinc-100 w-full flex min-h-screen  ">
            <section className="lg:max-w-lg  w-full flex items-center justify-center">
                {children}
            </section>
            <section className="flex-1 w-full bg-transparent hidden  min-h-screen lg:block bg-white">
                <Image
                    src="/placeholder.svg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </section>
        </main>
    )
}


export default RootLayout;