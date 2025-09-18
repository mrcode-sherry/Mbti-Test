import PricingPage from '@/components/PricingPage'
import WhatsAppButton from '@/components/WhatsAppButton'
import React from 'react'

const page = () => {
  return (
    <div className='overflow-hidden'>
      <PricingPage/>
      <section>
        <WhatsAppButton/>
      </section>
    </div>
  )
}

export default page
