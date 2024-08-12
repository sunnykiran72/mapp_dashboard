import Header from "@/components/custom/Header";
import NavBar from "@/components/custom/NavBar";
import { ReactNode } from "react";


const RootLayout = ({children} : Readonly<{children:ReactNode}>)=> {
    return (
        <main className="bg-white w-full flex ">
            <Header/>
            <NavBar/>
            <section className="flex-1 mt-20">
                 {children}
            </section>
        </main>
    )
}


export default RootLayout;