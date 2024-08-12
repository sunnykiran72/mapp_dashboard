import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TitleText } from '@/components/custom/server_mini_components'
import BusinessDetailsForm from './components/BusinessDetailsForm'
import StoreAddressForm from './components/StoreAddressForm'


const page = () => {
  return (
    <section className='p-7 space-y-7 max-w-4xl mx-auto '>
        <TitleText
           title='Store Information'
        />

      <Accordion 
        type="single" 
        collapsible 
        className='space-y-6'
      >

        <AccordionItem value="item-1">
          <AccordionTrigger>Business Information</AccordionTrigger>
          <AccordionContent>
            <BusinessDetailsForm/>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Store Address</AccordionTrigger>
          <AccordionContent>
           <StoreAddressForm/>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Bank Details</AccordionTrigger>
          <AccordionContent>
              <article>
                    <span>You haven't added any bank details yet</span>
              </article>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </section>
  )
}

export default page