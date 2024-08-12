import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Mapp Dashboard",
    description: "Mapp Dashboard to manage your store & customers in a single place",
  };
  

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({children} : Readonly<{children:ReactNode}>)=> {
    return (
        <html lang="en">
            <body className={cn([inter.className , "bg-background "])}>
                {children}
            </body>
        </html>
    )
}


export default RootLayout;